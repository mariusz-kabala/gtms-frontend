import React from 'react'
import { render } from '@testing-library/react'
import { RemindPasswordPage } from 'pages/remind-password'
import { RemindPasswordForm } from 'components/remind-password/Form'

jest.mock('components/remind-password/Form', () => ({
  RemindPasswordForm: jest.fn().mockImplementation(() => <></>),
}))

describe('<RemindPasswordPage />', () => {
  it('Should be rendered', () => {
    const { getByTestId } = render(<RemindPasswordPage />)

    expect(getByTestId('remind-password-page')).toBeInTheDocument()
  })

  it('Should render reset password form', () => {
    render(<RemindPasswordPage />)

    expect(RemindPasswordForm).toBeCalledTimes(2)
  })

  it('Should display confirmation when get onSuccess callback from from', () => {
    // eslint-disable-next-line
    let onSuccessCallback: any
    ;(RemindPasswordForm as jest.Mock).mockImplementation(
      ({ onSuccess }: { onSuccess: () => void }) => {
        onSuccessCallback = onSuccess
        return <></>
      }
    )

    const { getByTestId } = render(<RemindPasswordPage />)

    onSuccessCallback()

    expect(RemindPasswordForm).toBeCalledTimes(3)
    expect(
      getByTestId('remind-password-success-confirmation')
    ).toBeInTheDocument()
  })

  it('Should return translations namespace from initial func', async done => {
    if (!RemindPasswordPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props = await RemindPasswordPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    done()
  })
})
