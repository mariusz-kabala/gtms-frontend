import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { CookiePolicy } from './index'
import { getItem, setItem } from '@gtms/commons/helpers/localStorage'

describe('<CookiePolicy />', () => {
  it('Should set cookie when click on accept button', () => {
    ;(getItem as jest.Mock).mockReturnValue('false')

    const { getByTestId } = render(
      <CookiePolicy>
        <div>actual content</div>
      </CookiePolicy>
    )

    fireEvent.click(getByTestId('cookie-accept-button'))

    expect(setItem).toBeCalled()
    expect(setItem).toBeCalledTimes(1)
  })
})
