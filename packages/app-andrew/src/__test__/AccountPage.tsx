import React from 'react'
import { render } from '@testing-library/react'
import { AccountPage } from '../pages/account'
import { useTranslation } from '@gtms/commons/i18n'

describe('<AccountPage />', () => {
  it('Should render the page', () => {
    const { getByTestId } = render(<AccountPage />)

    expect(getByTestId('account-page-private')).toBeInTheDocument()

    expect(getByTestId('account-page-public')).toBeInTheDocument()

    expect(getByTestId('tag-group')).toBeInTheDocument()

    expect(getByTestId('delete-account')).toBeInTheDocument()

    expect(getByTestId('push-notifications')).toBeInTheDocument()

    expect(useTranslation).toBeCalledWith('account')
  })

  it('Should return translations namespace  from getInitialProps', async done => {
    if (!AccountPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props: {
      namespacesRequired?: string[]
    } = await AccountPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['account'])

    done()
  })
})
