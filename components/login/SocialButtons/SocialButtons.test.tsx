import React from 'react'
import { render } from '@testing-library/react'
import { SocialButtons } from './index'
import { useFacebookLogin } from 'hooks/fbLogin'
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
