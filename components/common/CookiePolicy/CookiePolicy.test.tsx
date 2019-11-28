import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { CookiePolicy } from './index'
import { getItem, setItem } from 'helpers/localStorage'

jest.mock('helpers/localStorage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  }
})

describe('<Button />', () => {
  it('Should render cookie rules info as policy was not accepted', () => {
    ;(getItem as jest.Mock).mockReturnValue('false')

    const { getByTestId } = render(
      <CookiePolicy>
        <div>actual content</div>
      </CookiePolicy>
    )

    expect(getByTestId('cookie-policy')).toBeInTheDocument()
    expect(getItem).toBeCalled()
    expect(getItem).toBeCalledTimes(1)
  })

  it('Should render actual content when cookie is accepted', () => {
    ;(getItem as jest.Mock).mockReturnValue('true')

    const { queryByTestId } = render(
      <CookiePolicy>
        <div data-testid="content">actual content</div>
      </CookiePolicy>
    )

    expect(queryByTestId('cookie-policy')).toBeNull()
  })

  it('Should set cookie when click on accept button', () => {
    ;(getItem as jest.Mock).mockReturnValue('false')

    const { getByTestId } = render(
      <CookiePolicy>
        <div>actual content</div>
      </CookiePolicy>
    )

    fireEvent.click(getByTestId('action-button'))

    expect(setItem).toBeCalled()
    expect(setItem).toBeCalledTimes(1)
  })
})
