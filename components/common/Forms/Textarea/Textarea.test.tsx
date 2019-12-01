import React from 'react'
import { render } from '@testing-library/react'
import { Textarea } from './index'

describe('<Textarea />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <Textarea additionalStyles={'testingStyles'} />
    )

    expect(getByTestId('form-textarea')).toBeInTheDocument()
    expect(container.querySelector('.testingStyles')).toBeInTheDocument()
  })

  it('Should render Textarea placeholder', () => {
    const { getByPlaceholderText } = render(
      <Textarea placeholder={'testing'} />
    )

    expect(getByPlaceholderText('testing')).toBeInTheDocument()
  })
})
