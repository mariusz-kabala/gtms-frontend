import React from 'react'
import { render } from '@testing-library/react'
import { WelcomeSlider } from './index'

describe('<WelcomeSlider />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<WelcomeSlider />)

    expect(getByTestId('welcome-slider')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(<WelcomeSlider additionalStyles={'cssTest'} />)

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
