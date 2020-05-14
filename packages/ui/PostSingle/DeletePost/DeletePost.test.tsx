import React from 'react'
import { render } from '@testing-library/react'
import { DeletePost } from './index'

describe('<DeletePost />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<DeletePost />)

    expect(getByTestId('post-single-delete-post-button')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <DeletePost additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
