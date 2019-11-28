import React from 'react'
import { render } from '@testing-library/react'

describe('<FourHundredFour />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<FourHundredFour />)

    expect(getByTestId('four-hundred-four')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <FourHundredFour additionalStyles={'cssTest'} />
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
