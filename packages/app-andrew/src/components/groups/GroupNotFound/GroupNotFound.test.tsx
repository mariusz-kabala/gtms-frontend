import React from 'react'
import { render } from '@testing-library/react'
import { GroupNotFound } from './index'
import { useTranslation } from '@gtms/commons/i18n'

describe('<GroupNotFound />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<GroupNotFound />)

    expect(getByTestId('group-not-found')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('groupNotFoundComponent')
  })
})
