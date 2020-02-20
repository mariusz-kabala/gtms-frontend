import React from 'react'
import { render } from '@testing-library/react'
import { AccountPage } from '../pages/account'
import { useTranslation } from '@gtms/commons/i18n'

describe('<AccountPage />', () => {
  it('Should render the page', async done => {
    const { getByTestId } = render(<AccountPage />)

    expect(getByTestId('account-page')).toBeInTheDocument()

    expect(useTranslation).toBeCalledWith('account')

    done()
  })
})
