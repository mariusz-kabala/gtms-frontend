import React from 'react'
import { render } from '@testing-library/react'
import { UserEmail } from './index'

describe('<UserEmail />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<UserEmail />)

    expect(getByTestId('userEmail')).toBeInTheDocument()
  })
})
