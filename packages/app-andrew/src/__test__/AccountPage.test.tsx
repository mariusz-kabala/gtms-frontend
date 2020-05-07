import React from 'react'
import { render } from '@testing-library/react'
import { AccountPage } from '../pages/account'
import { useTranslation } from '@gtms/commons/i18n'
import { DeleteAccount } from '../components/account/DeleteAccount'

jest.mock('../components/account/DeleteAccount', () => ({
  DeleteAccount: jest.fn().mockImplementation(() => <></>),
}))

describe('<AccountPage />', () => {
  const accountDetails = {
    id: 'fake-id',
    email: 'fake@email.com',
    tags: [],
    roles: [],
  }
  it('Should render the page', () => {
    const { getByTestId } = render(
      <AccountPage namespacesRequired={[]} accountDetails={accountDetails} />
    )

    expect(getByTestId('account-page-private')).toBeInTheDocument()

    expect(getByTestId('account-page-public')).toBeInTheDocument()

    expect(getByTestId('tag-group')).toBeInTheDocument()

    expect(getByTestId('user-name')).toBeInTheDocument()

    expect(DeleteAccount).toBeCalled()

    expect(useTranslation).toBeCalledWith('account')
  })

  it('Should return translations namespace from getInitialProps', async (done) => {
    if (!AccountPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props = await AccountPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    expect(props.namespacesRequired).toEqual(['account'])

    done()
  })

  // @todo: drop this test when proper onConfirm will be implemented
  it('Should assign a function to DeleteAccount onConfirm prop', () => {
    let onConfirm: any
    ;(DeleteAccount as jest.Mock).mockImplementation((props: any) => {
      onConfirm = props.onConfirm
      return <></>
    })

    render(
      <AccountPage namespacesRequired={[]} accountDetails={accountDetails} />
    )

    expect(typeof onConfirm).toBe('function')

    onConfirm()
  })
})
