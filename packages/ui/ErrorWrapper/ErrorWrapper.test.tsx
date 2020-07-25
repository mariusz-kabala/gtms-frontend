import React from 'react'
import { render } from '@testing-library/react'
import { ErrorWrapper } from './index'

describe('<ErrorWrapper />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <ErrorWrapper>
        <a>testing</a>
      </ErrorWrapper>
    )

    expect(getByTestId('error-wrapper')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <ErrorWrapper additionalStyles={'cssTest'}>
        <a>testing</a>
      </ErrorWrapper>
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
