import React from 'react'
import { render, act, wait } from '@testing-library/react'
import { LoginPage } from 'pages/login'
import { LoginForm } from 'components/login/Form'
import { SocialButtons } from 'components/login/SocialButtons'
import { Router, useTranslation } from 'i18n'
import { parseCookies, destroyCookie } from 'nookies'
import { userStore, IUserStore } from 'state/user'
import { initAuthSession } from 'helpers/auth'
import { NextPageContext } from 'next'
import { redirect } from 'helpers/redirect'

jest.mock('nookies', () => ({
  destroyCookie: jest.fn(),
  parseCookies: jest.fn().mockImplementation(() => ({
    redirectTo: '/fake/redirect',
  })),
}))

jest.mock('components/login/Form', () => ({
  LoginForm: jest.fn().mockImplementation(() => <></>),
}))

jest.mock('components/login/SocialButtons', () => ({
  SocialButtons: jest.fn().mockImplementation(() => <></>),
}))

jest.mock('helpers/auth', () => ({
  initAuthSession: jest.fn().mockImplementation(() => Promise.resolve()),
}))

jest.mock('helpers/redirect', () => ({
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
    ;(initAuthSession as jest.Mock).mockClear()
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

  it('Should redirect to /fake/url when store has valid auth session and param redirectTo is provided', async () => {
    render(<LoginPage redirectTo="/fake/url" />)

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
      expect(redirect).toBeCalledWith('/fake/url')
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

  it('Should return translations namespace and redirectTo from getInitialProps', async done => {
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
    expect(props).toHaveProperty('redirectTo')
    done()
  })

  it('Should parse cookies to return proper redirection after login URL from getInitialProps', async done => {
    if (!LoginPage.getInitialProps) {
      return done()
    }

    // eslint-disable-next-line
    const ctx = {} as NextPageContext

    const props: {
      namespacesRequired?: string[]
      redirectTo?: string
    } = await LoginPage.getInitialProps(ctx)

    expect(props).toHaveProperty('redirectTo')
    expect(props.redirectTo).toEqual('/fake/redirect')

    expect(destroyCookie).toBeCalledTimes(1)
    expect(parseCookies).toBeCalledTimes(1)

    expect(destroyCookie).toBeCalledWith(ctx, 'redirectTo')

    expect(redirect).not.toBeCalled()

    done()
  })

  it('Should initialize user auth session from JWT cookie', async done => {
    if (!LoginPage.getInitialProps) {
      return done()
    }

    const ctx = {} as NextPageContext

    await LoginPage.getInitialProps(ctx)

    expect(initAuthSession).toBeCalledTimes(1)
    expect(initAuthSession).toBeCalledWith(ctx)

    expect(redirect).not.toBeCalled()

    done()
  })

  it('Should redirect to / if auth session is valid', async done => {
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
