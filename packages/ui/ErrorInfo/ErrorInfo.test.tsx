import React from 'react'
import { render } from '@testing-library/react'
import { ErrorInfo } from './index'

describe('<ErrorInfo />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <ErrorInfo>
        <a>testing</a>
      </ErrorInfo>
    )

    expect(getByTestId('error-info')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <ErrorInfo additionalStyles={'cssTest'}>
        <a>testing</a>
      </ErrorInfo>
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
