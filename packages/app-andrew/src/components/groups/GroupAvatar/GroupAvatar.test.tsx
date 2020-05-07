import React from 'react'
import { render } from '@testing-library/react'
import { GroupAvatar } from './index'
import { useTranslation } from '@gtms/commons/i18n'

describe('<GroupAvatar />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<GroupAvatar />)

    expect(getByTestId('group-avatar')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupAvatarComponent')
  })
})
