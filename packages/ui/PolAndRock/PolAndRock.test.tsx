import React from 'react'
import { render } from '@testing-library/react'
import { PolAndRock } from './index'

describe('<PolAndRock />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<PolAndRock />)

    expect(getByTestId('pol-and-rock')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <PolAndRock additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
