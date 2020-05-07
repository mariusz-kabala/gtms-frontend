import React from 'react'
import { render } from '@testing-library/react'
import { GroupNoAccess } from './index'
import { useTranslation } from '@gtms/commons/i18n'

describe('<GroupNoAccess />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<GroupNoAccess />)

    expect(getByTestId('group-no-acess')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupNoAccessComponent')
  })
})
