import React from 'react'
import { render } from '@testing-library/react'
import { UserPassword } from './index'

describe('<UserPassword />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<UserPassword />)

    expect(getByTestId('userPassword')).toBeInTheDocument()
  })
})
