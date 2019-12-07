import React from 'react'
import { render, wait, act } from '@testing-library/react'
import { ResetPasswordPage } from 'pages/reset-password/[code]'
import { useRouter } from 'next/router'
import { ResetPasswordForm } from 'components/reset-password/Form'
import { FetchMock } from 'jest-fetch-mock'
import { useTranslation } from 'i18n'

const fetchMock = fetch as FetchMock

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockImplementation(() => ({
      query: {
        code: 'fake-code',
      },
      push: jest.fn(),
    })),
  }
})

jest.mock('components/reset-password/Form', () => ({
  ResetPasswordForm: jest.fn().mockImplementation(() => <></>),
}))

jest.mock('api/auth', () => ({
  checkCodeReq: jest.fn().mockImplementation(() => Promise.resolve()),
}))

describe('<ResetPasswordPage />', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
    ;(ResetPasswordForm as jest.Mock).mockClear()
  })

  it('Should render a spinner while validation reset password code', () => {
    fetchMock.mockResponse('{}')
    const { getByTestId, queryByTestId } = render(<ResetPasswordPage />)

    expect(getByTestId('remind-password-page')).toBeInTheDocument()
    expect(getByTestId('spinner')).toBeInTheDocument()
    expect(queryByTestId('reset-password-changed-confirmation')).toBeNull()
    expect(queryByTestId('reset-password-form')).toBeNull()

    expect(useTranslation).toBeCalledWith('resetPassword')

    expect(ResetPasswordForm).not.toBeCalled()

    wait(() => expect(fetchMock).toBeCalledTimes(1))
  })

  it('Should render change password form after confirming that code is valid', async done => {
    fetchMock.mockResponse('{}')

    const { queryByTestId } = render(<ResetPasswordPage />)

    await wait(() => expect(ResetPasswordForm).toBeCalledTimes(1))

    expect(queryByTestId('spinner')).toBeNull()
    expect(queryByTestId('reset-password-changed-confirmation')).toBeNull()

    wait(() => expect(fetchMock).toBeCalledTimes(1))

    done()
  })

  it('Should redirect to login when code is invalid', () => {
    fetchMock.mockRejectOnce(new Error('fake error'))

    const push = jest.fn()
    ;(useRouter as jest.Mock).mockImplementationOnce(() => ({
      query: {},
      push,
    }))

    act(() => {
      render(<ResetPasswordPage />)
    })

    wait(() => expect(push).toBeCalledTimes(1))
  })

  it('Should render password has been changed confirmation', async done => {
    fetchMock.mockResponse('{}')

    // eslint-disable-next-line
    let onSuccessCallback: any
    ;(ResetPasswordForm as jest.Mock).mockImplementation(
      ({ onSuccess }: { onSuccess: () => void }) => {
        onSuccessCallback = onSuccess
        return <></>
      }
    )

    const { queryByTestId, getByTestId } = render(<ResetPasswordPage />)

    await wait(() => expect(ResetPasswordForm).toBeCalled())

    await act(async () => {
      await onSuccessCallback()
    })

    expect(queryByTestId('spinner')).toBeNull()
    expect(
      getByTestId('reset-password-changed-confirmation')
    ).toBeInTheDocument()

    done()
  })

  it('Should return translation namespaces from initial func', async done => {
    if (!ResetPasswordPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props = await ResetPasswordPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    done()
  })
})
