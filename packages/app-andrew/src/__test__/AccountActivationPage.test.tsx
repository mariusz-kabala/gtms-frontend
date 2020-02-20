import React from 'react'
import { render, wait, waitForElement } from '@testing-library/react'
import { ActivateAccountPage } from '../pages/activate-account/[code]'
import { FetchMock } from 'jest-fetch-mock'
import { useTranslation } from '@gtms/commons/i18n'
import { userStore, IUserStore } from '@gtms/state-user'
import { initAuthSession } from '@gtms/commons/helpers/auth'
import { NextPageContext } from 'next'
import { redirect } from '@gtms/commons/helpers/redirect'

const fetchMock = fetch as FetchMock

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockImplementation(() => ({
      query: {},
      push: jest.fn(),
    })),
  }
})

jest.mock('@gtms/commons/helpers/auth', () => ({
  initAuthSession: jest.fn().mockImplementation(() => Promise.resolve()),
}))

jest.mock('@gtms/commons/helpers/redirect', () => ({
  redirect: jest.fn(),
}))

describe('<ActivateAccountPage />', () => {
  beforeEach(() => {
    ;(initAuthSession as jest.Mock).mockClear()
    ;(redirect as jest.Mock).mockClear()
  })

  it('Should render the page', async done => {
    fetchMock.mockResponse('{}')

    const { getByTestId, queryByTestId } = render(<ActivateAccountPage />)

    expect(getByTestId('activate-account-page')).toBeInTheDocument()
    expect(getByTestId('spinner')).toBeInTheDocument()

    expect(queryByTestId('activate-account-page-confirmation')).toBeNull()
    expect(queryByTestId('activate-account-page-activation-failed')).toBeNull()

    expect(useTranslation).toBeCalledWith('accountActivation')

    await wait(() => expect(fetchMock).toBeCalled())

    done()
  })

  it('Should display confirmation message, after activation the account', async done => {
    fetchMock.mockResponse('{}')

    const { getByTestId, queryByTestId } = render(<ActivateAccountPage />)

    await waitForElement(() =>
      getByTestId('activate-account-page-confirmation')
    )

    expect(queryByTestId('spinner')).toBeNull()
    expect(queryByTestId('activate-account-page-activation-failed')).toBeNull()
    done()
  })

  it('Should display error message when 404 in the response from the API', async done => {
    fetchMock.mockRejectOnce(new Error('fake error'))

    const { getByTestId, queryByTestId } = render(<ActivateAccountPage />)

    await waitForElement(() =>
      getByTestId('activate-account-page-activation-failed')
    )

    expect(queryByTestId('spinner')).toBeNull()
    expect(queryByTestId('activate-account-page-confirmation')).toBeNull()
    done()
  })

  it('Should return translations namespace from initial func', async done => {
    if (!ActivateAccountPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props = await ActivateAccountPage.getInitialProps(ctx)

    expect(initAuthSession).toBeCalledTimes(1)
    expect(initAuthSession).toBeCalledWith(ctx)
    expect(redirect).not.toBeCalled()

    expect(props).toHaveProperty('namespacesRequired')
    done()
  })

  it('Should redirect to / if auth session is valid', async done => {
    if (!ActivateAccountPage.getInitialProps) {
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

    await ActivateAccountPage.getInitialProps(ctx)

    expect(initAuthSession).toBeCalledTimes(1)
    expect(initAuthSession).toBeCalledWith(ctx)
    expect(redirect).toBeCalledTimes(1)
    expect(redirect).toBeCalledWith('/', ctx)

    done()
  })
})
