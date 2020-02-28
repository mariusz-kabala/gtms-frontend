import React from 'react'
import { render } from '@testing-library/react'
import { UserName } from './index'

describe('<UserName />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<UserName />)

    expect(getByTestId('userName')).toBeInTheDocument()
  })
})
