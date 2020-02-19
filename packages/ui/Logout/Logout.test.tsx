import React from 'react'
import { Logout } from './index'
import { render, fireEvent } from '@testing-library/react'
import { setItem } from '@gtms/commons/helpers/localStorage'
import { useTranslation } from '@gtms/commons/i18n'

jest.mock('@gtms/commons/helpers/localStorage', () => ({
  setItem: jest.fn(),
}))

describe('<Logout />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<Logout />)

    expect(getByTestId('logout-button')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('common')
  })

  it('Should set logout LC item when clicking', () => {
    const { getByTestId } = render(<Logout />)

    fireEvent.click(getByTestId('logout-button'))

    expect(setItem).toBeCalled()
  })
})
