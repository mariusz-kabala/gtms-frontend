import React from 'react'
import { render } from '@testing-library/react'
import { NavigationDot } from './index'

describe('<NavigationDot />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<NavigationDot />)

    expect(getByTestId('navigationDot')).toBeInTheDocument()
  })
})
