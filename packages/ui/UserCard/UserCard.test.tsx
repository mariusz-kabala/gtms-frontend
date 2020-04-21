import React from 'react'
import { render } from '@testing-library/react'
import { UserCard } from './index'

describe('<UserCard />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <UserCard onClose={jest.fn()} image="/fake/img.png" />
    )

    expect(getByTestId('user-card')).toBeInTheDocument()
  })
})
