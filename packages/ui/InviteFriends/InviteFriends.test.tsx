import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { InviteFriends } from './index'

describe('<InviteFriends />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<InviteFriends />)

    expect(getByTestId('inviteFriends')).toBeInTheDocument()
  })

  it('Should trigger provided callback when clicking on it', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<InviteFriends />)

    fireEvent.click(getByTestId('inviteFriends'))

    expect(callback).toBeCalledTimes(1)
  })
})
