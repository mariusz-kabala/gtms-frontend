import React from 'react'
import { render, wait } from '@testing-library/react'
import { SocialButtons } from './index'
import { useFacebookLogin } from 'hooks/fbLogin'
import { act } from 'react-dom/test-utils'
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
      <SocialButtons onFailure={jest.fn()} onSuccess={jest.fn()} />
    )

    expect(getByTestId('social-buttons')).toBeInTheDocument()
    expect(queryByTestId('social-buttons-loader')).toBeNull()
  })

  it('Should render Google and Facebook login buttons', () => {
    const { getByTestId } = render(
      <SocialButtons onFailure={jest.fn()} onSuccess={jest.fn()} />
    )

    expect(getByTestId('social-buttons-facebook-button')).toBeInTheDocument()
    expect(getByTestId('social-buttons-google-button')).toBeInTheDocument()

    expect(useFacebookLogin).toBeCalled()
  })

  it('Should trigger onSuccess callback after successful facebook login', async () => {
    fetchMock.mockResponse('{}')

    const fakeOnSuccess = jest.fn()
    const fakeonFailed = jest.fn()
    let onSuccess: any
    ;(useFacebookLogin as jest.Mock).mockImplementation(
      (params: { onSuccess: () => void }) => {
        onSuccess = params.onSuccess

        return {
          onClick: jest.fn(),
          isProcessing: false,
        }
      }
    )

    act(() => {
      render(
        <SocialButtons onFailure={fakeonFailed} onSuccess={fakeOnSuccess} />
      )
    })

    act(() => {
      onSuccess({
        accessToken: 'fake-token',
        id: 'fake-id',
      })
    })

    expect(fetchMock).toBeCalled()
    expect(fakeonFailed).not.toBeCalled()
    expect(fetchMock.mock.calls[0][0]).toBe('/v1/auth/facebook')
    expect(fetchMock.mock.calls[0][1].body).toEqual(
      JSON.stringify({ accessToken: 'fake-token', id: 'fake-id' })
    )

    wait(() => expect(fakeOnSuccess).toBeCalled())
  })

  it('Should trigger onFailure callback when facebook login fails', async () => {
    fetchMock.mockRejectOnce(new Error('fake error'))

    const fakeOnSuccess = jest.fn()
    const fakeonFailed = jest.fn()
    let onSuccess: any
    ;(useFacebookLogin as jest.Mock).mockImplementation(
      (params: { onSuccess: () => void }) => {
        onSuccess = params.onSuccess

        return {
          onClick: jest.fn(),
          isProcessing: false,
        }
      }
    )

    act(() => {
      render(
        <SocialButtons onFailure={fakeonFailed} onSuccess={fakeOnSuccess} />
      )
    })

    act(() => {
      onSuccess({
        accessToken: 'fake-token',
        id: 'fake-id',
      })
    })

    expect(fetchMock).toBeCalled()
    expect(fakeOnSuccess).not.toBeCalled()

    wait(() => expect(fakeonFailed).toBeCalled())
  })

  it('Should trigger onSuccess callback after successful google login', () => {
    fetchMock.mockResponse('{}')

    const fakeOnSuccess = jest.fn()
    const fakeonFailed = jest.fn()
    let onSuccess: any
    ;(GoogleLogin as jest.Mock).mockImplementation(
      (params: { onSuccess: () => void }) => {
        onSuccess = params.onSuccess
        return <></>
      }
    )

    render(<SocialButtons onFailure={fakeonFailed} onSuccess={fakeOnSuccess} />)

    act(() => {
      onSuccess({
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

    wait(() => {
      expect(fakeOnSuccess).toBeCalled()
    })
  })

  it('Should trigger onFailure callback when google login fails', () => {
    fetchMock.mockRejectOnce(new Error('fake error'))

    const fakeOnSuccess = jest.fn()
    const fakeonFailed = jest.fn()
    let onSuccess: any
    ;(GoogleLogin as jest.Mock).mockImplementation(
      (params: { onSuccess: () => void }) => {
        onSuccess = params.onSuccess
        return <></>
      }
    )

    render(<SocialButtons onFailure={fakeonFailed} onSuccess={fakeOnSuccess} />)

    act(() => {
      onSuccess({
        accessToken: 'fake-token',
        googleId: 'fake-id',
      })
    })

    expect(fetchMock).toBeCalled()
    expect(fakeOnSuccess).not.toBeCalled()

    wait(() => {
      expect(fakeonFailed).toBeCalled()
    })
  })
})
