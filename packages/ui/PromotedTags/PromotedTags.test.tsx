import React from 'react'
import { render } from '@testing-library/react'
import { PromotedTags } from './index'

describe('<PromotedTags />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<PromotedTags />)

    expect(getByTestId('promoted-tags')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <PromotedTags additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
