import React from 'react'
import { render } from '@testing-library/react'
import { DeleteAccount } from './index'

describe('<DeleteAccount />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<DeleteAccount />)

    expect(getByTestId('deleteAccount')).toBeInTheDocument()
  })
})
