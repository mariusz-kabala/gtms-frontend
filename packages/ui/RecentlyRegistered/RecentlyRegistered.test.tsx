import React from 'react'
import { render } from '@testing-library/react'
import { RecentlyRegistered } from './index'

describe('<RecentlyRegistered />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<RecentlyRegistered />)

    expect(getByTestId('recently-registered')).toBeInTheDocument()
  })
})
