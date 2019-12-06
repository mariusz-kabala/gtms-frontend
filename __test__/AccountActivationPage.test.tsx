import React from 'react'
import { render, wait, waitForElement } from '@testing-library/react'
import { ActivateAccountPage } from 'pages/activate-account/[code]'
import { FetchMock } from 'jest-fetch-mock'

const fetchMock = fetch as FetchMock

jest.mock('next/router', () => {
  return {
    useRouter: jest.fn().mockImplementation(() => ({
      query: {},
      push: jest.fn(),
    })),
  }
})

describe('<ActivateAccountPage />', () => {
  it('Should render the page', async done => {
    fetchMock.mockResponse('{}')

    const { getByTestId, queryByTestId } = render(<ActivateAccountPage />)

    expect(getByTestId('activate-account-page')).toBeInTheDocument()
    expect(getByTestId('spinner')).toBeInTheDocument()

    expect(queryByTestId('activate-account-page-confirmation')).toBeNull()
    expect(queryByTestId('activate-account-page-activation-failed')).toBeNull()

    await wait(() => expect(fetchMock).toBeCalled())

    done()
  })

  it('Should display confirmation message, after activation the account', async done => {
    fetchMock.mockResponse('{}')

    const { getByTestId, queryByTestId } = render(<ActivateAccountPage />)

    await waitForElement(() =>
      getByTestId('activate-account-page-confirmation')
    )

    expect(queryByTestId('spinner')).toBeNull()
    expect(queryByTestId('activate-account-page-activation-failed')).toBeNull()
    done()
  })

  it('Should display error message when 404 in the response from the API', async done => {
    fetchMock.mockRejectOnce(new Error('fake error'))

    const { getByTestId, queryByTestId } = render(<ActivateAccountPage />)

    await waitForElement(() =>
      getByTestId('activate-account-page-activation-failed')
    )

    expect(queryByTestId('spinner')).toBeNull()
    expect(queryByTestId('activate-account-page-confirmation')).toBeNull()
    done()
  })

  it('Should return translations namespace from initial func', async done => {
    if (!ActivateAccountPage.getInitialProps) {
      return done()
    }
    // eslint-disable-next-line
    const ctx: any = null

    const props = await ActivateAccountPage.getInitialProps(ctx)

    expect(props).toHaveProperty('namespacesRequired')
    done()
  })
})
