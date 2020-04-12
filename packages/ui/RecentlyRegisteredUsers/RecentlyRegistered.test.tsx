import React from 'react'
import { render } from '@testing-library/react'
import { RecentlyRegisteredUsers } from './index'

describe('<RecentlyRegisteredUsers />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<RecentlyRegisteredUsers />)

    expect(getByTestId('recently-registered-users')).toBeInTheDocument()
  })
})
