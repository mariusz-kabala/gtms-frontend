import React from 'react'
import { render } from '@testing-library/react'
import ErrorPage from 'pages/_error'

describe('Error page', () => {
  it('Should render internal error page', () => {
    const { getByTestId } = render(<ErrorPage statusCode={500} />)

    expect(getByTestId('internal-error')).toBeInTheDocument()
  })

  it('Should render 404 error page', () => {
    const { getByTestId } = render(<ErrorPage statusCode={404} />)

    expect(getByTestId('four-hundred-four')).toBeInTheDocument()
  })

  it('Should return proper response code from getInitialProps', async done => {
    // eslint-disable-next-line
    const ctx: any = Promise.resolve({
      res: {
        statusCode: 500,
      },
      err: {
        statusCode: 500,
      },
    })

    if (ErrorPage.getInitialProps) {
      const results = await ErrorPage.getInitialProps(ctx)

      expect(results.statusCode).toBe(500)
      done()
    }
  })

  it('Should return error 404 if no valid error returned from getInitialProps', async done => {
    // eslint-disable-next-line
    const ctx: any = Promise.resolve({})
    if (ErrorPage.getInitialProps) {
      const results = await ErrorPage.getInitialProps(ctx)

      expect(results.statusCode).toBe(404)
    }
    done()
  })

  it('Should return proper error code from getInitialProps', async done => {
    // eslint-disable-next-line
    const ctx: any = Promise.resolve({
      err: {
        statusCode: 500,
      },
    })

    if (ErrorPage.getInitialProps) {
      const results = await ErrorPage.getInitialProps(ctx)

      expect(results.statusCode).toBe(500)
    }
    done()
  })
})
