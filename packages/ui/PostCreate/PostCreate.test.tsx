import React from 'react'
import { render } from '@testing-library/react'
import { PostCreate } from './index'

describe('<PostCreate />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<PostCreate />)

    expect(getByTestId('postCreate')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <PostCreate additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
