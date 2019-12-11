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
  })
})
