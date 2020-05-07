import React from 'react'
import { render } from '@testing-library/react'
import { InviteFriends } from './index'

describe('<InviteFriends />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <InviteFriends />
    )

    expect(getByTestId('invite-friends')).toBeInTheDocument()
  })
})
