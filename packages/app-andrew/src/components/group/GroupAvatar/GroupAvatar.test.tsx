import React from 'react'
import { render } from '@testing-library/react'
import { GroupAvatar } from './index'
import { useTranslation } from '@gtms/commons/i18n'
import { FileStatus } from '@gtms/commons'

describe('<GroupAvatar />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <GroupAvatar
        filesStatus={FileStatus.ready}
        files={{ jpg: '' }}
        isEditAllowed={false}
      />
    )

    expect(getByTestId('group-avatar')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupAvatarComponent')
  })
})
