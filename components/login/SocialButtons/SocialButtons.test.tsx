import React from 'react'
import { render, wait } from '@testing-library/react'
import { SocialButtons } from './index'
import { useFacebookLogin } from 'hooks/fbLogin'
import { act } from 'react-dom/test-utils'
import { FetchMock } from 'jest-fetch-mock'

const fetchMock = fetch as FetchMock

jest.mock('hooks/fbLogin', () => ({
  useFacebookLogin: jest.fn().mockImplementation(() => {
    return {
      onClick: jest.fn(),
      isProcessing: false,
    }
  }),
}))

describe('<SocialButtons />', () => {
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
      render(<SocialButtons onFailure={jest.fn()} onSuccess={fakeOnSuccess} />)
    })

    act(() => {
      onSuccess({
        accessToken: 'fake-token',
        id: 'fake-id',
      })
    })

    wait(() => expect(fakeOnSuccess).toBeCalled())
  })

  it('Should trigger onSuccess callback after successful google login', () => {
    // todo
  })
})
