import React from 'react'
import { render } from '@testing-library/react'
import { useTranslation } from '@gtms/commons/i18n'
import { RegistrationSuccessPage } from '../pages/registration/success'
import { NextPageContext } from 'next'
import { userStore, IUserStore } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
import { initAuthSession } from '@gtms/commons/helpers/auth'

jest.mock('@gtms/commons/helpers/auth', () => ({
  initAuthSession: jest.fn().mockImplementation(() => Promise.resolve()),
}))

jest.mock('@gtms/commons/helpers/redirect', () => ({
  redirect: jest.fn(),
}))

describe('<RegistrationSuccessPage />', () => {
  beforeEach(() => {
    ;(redirect as jest.Mock).mockClear()
    ;(initAuthSession as jest.Mock).mockClear()

    userStore.reset()
  })

  it('Should render the page', () => {
    const { getByTestId } = render(<RegistrationSuccessPage />)

    expect(getByTestId('registration-success-page')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('registration')
  })

  it('Should return translations namespace from getInitialProps', async done => {
    if (!RegistrationSuccessPage.getInitialProps) {
      return done()
    }

    const ctx = {} as NextPageContext

    const props: {
      namespacesRequired?: string[]
    } = await RegistrationSuccessPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['registration'])

    done()
  })

  it('Should redirect to / if auth session is valid', async done => {
    if (!RegistrationSuccessPage.getInitialProps) {
      return done()
    }

    const now = new Date().getTime()
    const update: Partial<IUserStore> = {
      isInitialized: true,
      id: 'fake-id',
      email: 'tester@fake.email',
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

    await RegistrationSuccessPage.getInitialProps(ctx)

    expect(redirect).toBeCalledTimes(1)
    expect(redirect).toBeCalledWith('/', ctx)

    done()
  })

  it('Should redirect to /registration if no user data in store', async done => {
    if (!RegistrationSuccessPage.getInitialProps) {
      return done()
    }

    const ctx = {} as NextPageContext

    await RegistrationSuccessPage.getInitialProps(ctx)

    expect(redirect).toBeCalledTimes(1)
    expect(redirect).toBeCalledWith('/registration', ctx)

    done()
  })
})
