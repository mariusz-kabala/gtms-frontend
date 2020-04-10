import React from 'react'
import { render } from '@testing-library/react'
import { PostSingle } from './index'

describe('<PostSingle />', () => {
  it('Should be on the page', () => {
    const { getByTestId, getByText } = render(<PostSingle />)

    expect(getByTestId('postSingle')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <PostSingle additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
