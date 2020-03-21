import React from 'react'
import { render } from '@testing-library/react'
import { GroupMembersPage } from '../pages/group-members'
import { useTranslation } from '@gtms/commons/i18n'

describe('<GroupMembersPage />', () => {
  it('Should render group members page', () => {
    const { getByTestId } = render(<GroupMembersPage />)

    expect(getByTestId('group-members-page')).toBeInTheDocument()

    expect(useTranslation).toBeCalledWith('groupMembers')
  })
})
