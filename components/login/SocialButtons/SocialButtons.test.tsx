import React from 'react'
import { render, act, fireEvent, wait } from '@testing-library/react'
import { SocialButtons } from './index'
import { useFacebookLogin } from 'hooks/fbLogin'
import { FetchMock } from 'jest-fetch-mock'
import GoogleLogin from 'react-google-login'

const fetchMock = fetch as FetchMock

jest.mock('hooks/fbLogin', () => ({
  useFacebookLogin: jest.fn().mockImplementation(() => {
    return {
      onClick: jest.fn(),
      isProcessing: false,
    }
  }),
}))

jest.mock('react-google-login', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <></>),
}))

describe('<SocialButtons />', () => {
  beforeEach(() => {
    fetchMock.mockClear()
  })

  it('Should render on the page', () => {
    const { getByTestId, queryByTestId } = render(
      <SocialButtons onFailure={jest.fn()} />
    )

    expect(getByTestId('social-buttons')).toBeInTheDocument()
    expect(queryByTestId('social-buttons-loader')).toBeNull()
  })

  it('Should render Google and Facebook login buttons', () => {
    const { getByTestId } = render(<SocialButtons onFailure={jest.fn()} />)

    expect(getByTestId('social-buttons-facebook-button')).toBeInTheDocument()
    expect(getByTestId('social-buttons-google-button')).toBeInTheDocument()

    expect(useFacebookLogin).toBeCalled()
    expect(GoogleLogin).toBeCalled()
  })

  it('Should make a call to API with accessToken and id when success login using FB happens', async () => {
    fetchMock.mockResponse('{}')

    let onSuccessCallback: (payload: {
      accessToken: string
      id: string
    }) => unknown
    ;(useFacebookLogin as jest.Mock).mockImplementation(
      (params: {
        onSuccess: (payload: { accessToken: string; id: string }) => unknown
      }) => {
        onSuccessCallback = params.onSuccess

        return {
          onClick: jest.fn(),
          isProcessing: false,
        }
      }
    )

    render(<SocialButtons onFailure={jest.fn()} />)

    await act(async () => {
      await onSuccessCallback({
        accessToken: 'fake-token',
        id: 'fake-id',
      })
    })

    expect(fetchMock).toBeCalledTimes(1)
    expect(fetchMock.mock.calls[0][0]).toBe('/v1/auth/facebook')
    expect(fetchMock.mock.calls[0][1].body).toBe(
      '{"accessToken":"fake-token","id":"fake-id"}'
    )
  })

  it('Should trigger useFacebookLogin hook onClick callback when clicking on FB button', () => {
    const onClick = jest.fn()
    ;(useFacebookLogin as jest.Mock).mockImplementation(() => ({
      onClick,
      isProcessing: false,
    }))

    const { getByTestId } = render(<SocialButtons onFailure={jest.fn()} />)

    fireEvent.click(getByTestId('social-buttons-facebook-button'))

    expect(onClick).toBeCalledTimes(1)
  })

  it('Should trigger onSuccess callback after successful google login', async () => {
    fetchMock.mockResponse(
      '{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudHJ5Q29kZSI6IlBMIiwiZW1haWwiOiJtYXJpdXN6QGthYmFsYS53YXcucGwiLCJpZCI6IjVjZGZiNmE2YmFkODhiYjVkYmYxZWNjZiIsImxhbmd1YWdlQ29kZSI6InBsLVBMIiwiaXNBY3RpdmUiOnRydWUsInJvbGVzIjpbXSwiaWF0IjoxNTc2MDY0MjU2LCJleHAiOjE1NzYwNjUxNTZ9.PZAa597OZbxtl_vj-5zmDuUnJdwuII4Ld9SQEszRE8s","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3VudHJ5Q29kZSI6IlBMIiwiaXNBY3RpdmUiOnRydWUsImVtYWlsIjoibWFyaXVzekBrYWJhbGEud2F3LnBsIiwiaWQiOiI1Y2RmYjZhNmJhZDg4YmI1ZGJmMWVjY2YiLCJsYW5ndWFnZUNvZGUiOiJwbC1QTCIsInJvbGVzIjpbXSwiaWF0IjoxNTc2MDY0MjU2LCJleHAiOjE1NzYxNTA2NTZ9.ynOY04gvIa_LleZBwg3wZz3AB0fF2Z-3EPqeqpQL-fg"}'
    )

    const fakeonFailed = jest.fn()
    let onSuccess: any
    ;(GoogleLogin as jest.Mock).mockImplementation(
      (params: { onSuccess: () => void }) => {
        onSuccess = params.onSuccess
        return <></>
      }
    )

    act(() => {
      render(<SocialButtons onFailure={fakeonFailed} />)
    })

    await act(async () => {
      await onSuccess({
        accessToken: 'fake-token',
        googleId: 'fake-id',
      })
    })

    expect(fetchMock).toBeCalled()
    expect(fakeonFailed).not.toBeCalled()
    expect(fetchMock.mock.calls[0][0]).toBe('/v1/auth/google')
    expect(fetchMock.mock.calls[0][1].body).toEqual(
      JSON.stringify({ accessToken: 'fake-token', id: 'fake-id' })
    )
  })

  it('Should trigger onFailure callback when google login fails', () => {
    fetchMock.mockRejectOnce(new Error('fake error'))

    const fakeonFailed = jest.fn()
    let onSuccess: any
    ;(GoogleLogin as jest.Mock).mockImplementation(
      (params: { onSuccess: () => void }) => {
        onSuccess = params.onSuccess
        return <></>
      }
    )

    render(<SocialButtons onFailure={fakeonFailed} />)

    act(() => {
      onSuccess({
        accessToken: 'fake-token',
        googleId: 'fake-id',
      })
    })

    expect(fetchMock).toBeCalled()

    wait(() => {
      expect(fakeonFailed).toBeCalled()
    })
  })
})
