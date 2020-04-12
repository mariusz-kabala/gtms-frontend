import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import { ChangeGroupName } from '../../../components/group-settings/ChangeGroupName/index'
describe('<ChangeGroupName />', () => {
  it('Should render the page', () => {
    const groupName = 'Group name'
    const { getByTestId } = render(
      <ChangeGroupName formData={{ name: groupName }} />
    )

    expect(getByTestId('group-name')).toBeInTheDocument()
    expect(screen.queryByText(groupName)).toBeInTheDocument()
  })

  it('Should show show initial form data', async () => {
    const groupName = 'Group name'
    const wrapper = render(<ChangeGroupName formData={{ name: groupName }} />)

    const groupFormName = wrapper.getByText(groupName)
    expect(groupFormName).toBeInTheDocument()
  })

  it('Should show expand form on click', async () => {
    const groupName = 'Group name'
    const wrapper = render(<ChangeGroupName formData={{ name: groupName }} />)
    const groupForm = screen.queryByText(groupName)
    if (!groupForm) {
      return
    }

    fireEvent.click(groupForm)
    const labelAfterShowingEdidGroupNameForm = 'Edit Group Name'
    const labelElement = wrapper.getByText(labelAfterShowingEdidGroupNameForm)
    expect(labelElement).toBeInTheDocument()
  })
})
