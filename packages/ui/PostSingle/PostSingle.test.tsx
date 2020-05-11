import React from 'react'
import { render } from '@testing-library/react'
import { PostSingle } from './index'

describe('<PostSingle />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<PostSingle />)

    expect(getByTestId('post-single')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <PostSingle additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
