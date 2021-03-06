import React from 'react'
import { render, act } from '@testing-library/react'
import { RemindPasswordPage } from '../pages/remind-password'
import { RemindPasswordForm } from '../components/remind-password/Form'
import { useTranslation } from '@gtms/commons/i18n'
import { userStore, IUserStore } from '@gtms/state-user'
import { hasAuthSessionCookies } from '@gtms/state-user/src/helpers'
import { NextPageContext } from 'next'
import { redirect } from '@gtms/commons/helpers/redirect'

jest.mock('@gtms/state-user/src/helpers', () => ({
  hasAuthSessionCookies: jest.fn().mockImplementation(() => Promise.resolve()),
}))

jest.mock('@gtms/commons/helpers/redirect', () => ({
  redirect: jest.fn(),
}))

jest.mock('../components/remind-password/Form', () => ({
  RemindPasswordForm: jest.fn().mockImplementation(() => <></>),
}))

describe('<RemindPasswordPage />', () => {
  beforeEach(() => {
    ;(hasAuthSessionCookies as jest.Mock).mockClear()
    ;(redirect as jest.Mock).mockClear()
  })

  it('Should be rendered', () => {
    const { getByTestId } = render(<RemindPasswordPage />)

    expect(getByTestId('remind-password-page')).toBeInTheDocument()

    expect(useTranslation).toBeCalledWith('remindPassword')
  })

  it('Should render reset password form', () => {
    render(<RemindPasswordPage />)

    expect(RemindPasswordForm).toBeCalledTimes(2)
  })

  it('Should display confirmation when get onSuccess callback from from', () => {
    // eslint-disable-next-line
    let onSuccessCallback: any
    ;(RemindPasswordForm as jest.Mock).mockImplementation(
      ({ onSuccess }: { onSuccess: () => void }) => {
        onSuccessCallback = onSuccess
        return <></>
      }
    )

    const { getByTestId } = render(<RemindPasswordPage />)

    act(() => {
      onSuccessCallback()
    })

    expect(RemindPasswordForm).toBeCalledTimes(3)
    expect(
      getByTestId('remind-password-success-confirmation')
    ).toBeInTheDocument()
  })

  it('Should return translations namespace from initial func', async (done) => {
    if (!RemindPasswordPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props = await RemindPasswordPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    done()
  })

  it('Should redirect to / if auth session is valid', async (done) => {
    if (!RemindPasswordPage.getInitialProps) {
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

    await RemindPasswordPage.getInitialProps(ctx)

    expect(hasAuthSessionCookies).toBeCalledTimes(1)
    expect(hasAuthSessionCookies).toBeCalledWith(ctx)
    expect(redirect).toBeCalledTimes(1)
    expect(redirect).toBeCalledWith('/', ctx)

    done()
  })
})
