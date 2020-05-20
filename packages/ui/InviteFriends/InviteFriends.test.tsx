import React from 'react'
import { render } from '@testing-library/react'
import { InviteFriends } from './index'
import { useTranslation } from '@gtms/commons/i18n'

describe('<InviteFriends />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<InviteFriends />)

    expect(getByTestId('invite-friends')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('inviteFriendsComponent')
  })
})
