import React from 'react'
import { render } from '@testing-library/react'
import { InternalError } from './index'

describe('<InternalError />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<InternalError />)

    expect(getByTestId('internal-error')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(<InternalError additionalStyles={'cssTest'} />)

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
