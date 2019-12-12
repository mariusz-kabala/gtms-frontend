import React from 'react'
import { useTranslation } from 'i18n'
import { render } from '@testing-library/react'
import { SuccessConfirmation } from './index'

describe('<SuccessConfirmation />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<SuccessConfirmation />)

    expect(getByTestId('registration-success-confirmation')).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('registration')
  })
})
