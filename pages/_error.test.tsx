import React from 'react'
import { render } from '@testing-library/react'
import ErrorPage from './_error'

describe('Error page', () => {
  it('Should render internal error page', () => {
    const { getByTestId } = render(<ErrorPage statusCode={500} />)

    expect(getByTestId('internal-error')).toBeInTheDocument()
  })

  it('Should render 404 error page', () => {
    const { getByTestId } = render(<ErrorPage statusCode={404} />)

    expect(getByTestId('four-hundred-four')).toBeInTheDocument()
  })
})
