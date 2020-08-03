import React from 'react'
import { render } from '@testing-library/react'
import { useTranslation } from '@gtms/commons/i18n'
import { CreateYourOwnGroup } from './index'

describe('<CreateYourOwnGroup />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<CreateYourOwnGroup />)

    expect(getByTestId('create-your-own-group')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('createYourOwnGroup')
  })
})
