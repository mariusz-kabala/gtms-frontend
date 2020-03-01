import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { UserName } from './index'

describe('<UserName />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<UserName />)

    expect(getByTestId('user-name')).toBeInTheDocument()
  })

  it('Should display form when clicking on it', () => {
    const { getByTestId, queryByTestId } = render(<UserName />)

    expect(queryByTestId('user-name-change-form')).toBeNull()

    fireEvent.click(getByTestId('user-name'))

    expect(getByTestId('user-name-change-form')).toBeInTheDocument()
  })
})
