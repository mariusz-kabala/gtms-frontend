import React from 'react'
import { render, act, wait } from '@testing-library/react'
import { RegistrationPage } from '../pages/registration'
import { initAuthSession } from '@gtms/state-user/src/helpers'
import { NextPageContext } from 'next'
import { redirect } from '@gtms/commons/helpers/redirect'
import { RegistrationForm } from '../components/registration/Form'
import { SocialButtons } from '../components/login/SocialButtons'
import { useTranslation } from '@gtms/commons/i18n'
import { userStore, IUserStore } from '@gtms/state-user'

jest.mock('nookies', () => ({
  destroyCookie: jest.fn(),
  parseCookies: jest.fn().mockImplementation(() => ({
    redirectTo: '/fake/redirect',
  })),
}))

jest.mock('../components/registration/Form', () => ({
  RegistrationForm: jest.fn().mockImplementation(() => <></>),
}))

jest.mock('../components/login/SocialButtons', () => ({
  SocialButtons: jest.fn().mockImplementation(() => <></>),
}))

jest.mock('@gtms/state-user/src/helpers', () => ({
  initAuthSession: jest.fn().mockImplementation(() => Promise.resolve()),
}))

jest.mock('@gtms/commons/helpers/redirect', () => ({
  redirect: jest.fn(),
}))

describe('<RegistrationPage />', () => {
  beforeEach(() => {
    ;(redirect as jest.Mock).mockClear()
    ;(initAuthSession as jest.Mock).mockClear()

    userStore.reset()
  })

  it('Should render the page', () => {
    const { getByTestId, queryByTestId } = render(<RegistrationPage />)

    expect(getByTestId('registration-page')).toBeInTheDocument()
    expect(RegistrationForm).toBeCalledTimes(1)
    expect(SocialButtons).toBeCalledTimes(1)

    expect(queryByTestId('registration-page-error')).toBeNull()

    expect(useTranslation).toBeCalledWith('registration')
  })

  it('Should show error when register with social services fails', () => {
    let onFailureCallback: () => void
    ;(SocialButtons as jest.Mock).mockImplementation(
      ({ onFailure }: { onFailure: () => void }) => {
        onFailureCallback = onFailure
        return <></>
      }
    )

    const { getByTestId } = render(<RegistrationPage />)

    act(() => {
      onFailureCallback()
    })

    expect(getByTestId('registration-page-error')).toBeInTheDocument()
  })

  it('Should redirect to /registration/success after successful registration', async () => {
    render(<RegistrationPage />)

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

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!RegistrationPage.getInitialProps) {
      return done()
    }

    const ctx = {} as NextPageContext

    const props: {
      namespacesRequired?: string[]
    } = await RegistrationPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['registration'])

    done()
  })

  it('Should initialize user auth session from JWT cookie', async (done) => {
    if (!RegistrationPage.getInitialProps) {
      return done()
    }

    const ctx = {} as NextPageContext

    await RegistrationPage.getInitialProps(ctx)

    expect(initAuthSession).toBeCalledTimes(1)
    expect(initAuthSession).toBeCalledWith(ctx)

    expect(redirect).not.toBeCalled()

    done()
  })

  it('Should redirect to / if auth session is valid', async (done) => {
    if (!RegistrationPage.getInitialProps) {
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

    await RegistrationPage.getInitialProps(ctx)

    expect(redirect).toBeCalledTimes(1)
    expect(redirect).toBeCalledWith('/', ctx)

    done()
  })

  it('Should redirect to /registration/success when auth store has data but account is not active', async (done) => {
    if (!RegistrationPage.getInitialProps) {
      return done()
    }

    const update: Partial<IUserStore> = {
      isInitialized: true,
      isActive: false,
      isBlocked: false,
      id: 'fake-id',
      email: 'tester@fake.email',
    }

    userStore.update(update)

    const ctx = {} as NextPageContext

    await RegistrationPage.getInitialProps(ctx)

    expect(redirect).toBeCalledTimes(1)
    expect(redirect).toBeCalledWith('/registration/success', ctx)

    done()
  })
})
