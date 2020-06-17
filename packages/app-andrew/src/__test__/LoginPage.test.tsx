import React from 'react'
import { render, act, wait } from '@testing-library/react'
import { LoginPage } from '../pages/login'
import { LoginForm } from '../components/login/Form'
import { SocialButtons } from '../components/login/SocialButtons'
import { Router, useTranslation } from '@gtms/commons/i18n'
import { parseCookies, destroyCookie } from 'nookies'
import { userStore, IUserStore } from '@gtms/state-user'
import { hasAuthSessionCookies } from '@gtms/state-user/src/helpers'
import { NextPageContext } from 'next'
import { redirect } from '@gtms/commons/helpers/redirect'

jest.mock('nookies', () => ({
  destroyCookie: jest.fn(),
  parseCookies: jest.fn().mockImplementation(() => ({
    redirectTo: '/fake/redirect',
  })),
}))

jest.mock('../components/login/Form', () => ({
  LoginForm: jest.fn().mockImplementation(() => <></>),
}))

jest.mock('../components/login/SocialButtons', () => ({
  SocialButtons: jest.fn().mockImplementation(() => <></>),
}))

jest.mock('@gtms/state-user/src/helpers', () => ({
  hasAuthSessionCookies: jest.fn().mockImplementation(() => Promise.resolve()),
}))

jest.mock('@gtms/commons/helpers/redirect', () => ({
  redirect: jest.fn(),
}))

describe('<LoginPage />', () => {
  beforeEach(() => {
    ;(LoginForm as jest.Mock).mockClear()
    ;(SocialButtons as jest.Mock).mockClear()
    ;(useTranslation as jest.Mock).mockClear()
    ;(Router.push as jest.Mock).mockClear()
    ;(destroyCookie as jest.Mock).mockClear()
    ;(parseCookies as jest.Mock).mockClear()
    ;(hasAuthSessionCookies as jest.Mock).mockClear()
    ;(redirect as jest.Mock).mockClear()

    userStore.reset()
  })

  it('Should render the page', () => {
    const { getByTestId, queryByTestId } = render(<LoginPage />)

    expect(getByTestId('login-page')).toBeInTheDocument()
    expect(LoginForm).toBeCalledTimes(1)
    expect(SocialButtons).toBeCalledTimes(1)

    expect(queryByTestId('login-page-error')).toBeNull()

    expect(useTranslation).toBeCalledWith('login')
  })

  it('Should show error when login with social services fails', () => {
    let onFailureCallback: () => void
    ;(SocialButtons as jest.Mock).mockImplementation(
      ({ onFailure }: { onFailure: () => void }) => {
        onFailureCallback = onFailure
        return <></>
      }
    )

    const { getByTestId } = render(<LoginPage />)

    act(() => {
      onFailureCallback()
    })

    expect(getByTestId('login-page-error')).toBeInTheDocument()
  })

  it('Should redirect to / when store has valid auth session and no redirectTo is provided', async () => {
    render(<LoginPage />)

    act(() => {
      const now = new Date().getTime()
      const update: Partial<IUserStore> = {
        isInitialized: true,
        isActive: true,
        isBlocked: false,
        session: {
          accessToken: {
            expiresAt: now + 100,
            value: '',
          },
          refreshToken: {
            expiresAt: now + 100,
            value: '',
          },
          createdAt: now,
        },
      }

      userStore.update(update)
    })

    await wait(() => {
      expect(redirect).toBeCalledTimes(1)
      expect(redirect).toBeCalledWith('/')
    })
  })

  it('Should redirect to /registration/success when auth store has data but account is not active', async () => {
    render(<LoginPage />)

    act(() => {
      const update: Partial<IUserStore> = {
        isInitialized: true,
        isActive: false,
        isBlocked: false,
        id: 'fake-id',
        email: 'tester@fake.email',
      }

      userStore.update(update)
    })

    await wait(() => {
      expect(redirect).toBeCalled()
      expect(redirect).toBeCalledWith('/registration/success')
    })
  })

  it('Should return translations namespace and redirectTo from getInitialProps', async (done) => {
    if (!LoginPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
      redirectTo?: string
    } = await LoginPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['login'])
    done()
  })

  it('Should redirect to / if auth session is valid', async (done) => {
    if (!LoginPage.getInitialProps) {
      return done()
    }

    const now = new Date().getTime()
    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: true,
      isBlocked: false,
      session: {
        accessToken: {
          expiresAt: now + 100,
          value: '',
        },
        refreshToken: {
          expiresAt: now + 100,
          value: '',
        },
        createdAt: now,
      },
    }

    userStore.update(update)

    const ctx = {} as NextPageContext

    await LoginPage.getInitialProps(ctx)

    expect(redirect).toBeCalledTimes(1)
    expect(redirect).toBeCalledWith('/', ctx)

    done()
  })
})
