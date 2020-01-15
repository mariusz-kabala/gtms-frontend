import React from 'react'
import { useTranslation } from 'i18n'
import { render } from '@testing-library/react'
import { GroupCreate } from './index'

describe('<GroupCreate />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<GroupCreate />)

    expect(getByTestId('groupCreate')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupCreate')
  })
})
