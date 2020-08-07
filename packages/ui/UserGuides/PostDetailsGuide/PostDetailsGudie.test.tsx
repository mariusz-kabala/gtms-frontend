import React from 'react'
import { render } from '@testing-library/react'
import { PostDetailsGuide } from './index'

describe('<PostDetailsGuide />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<PostDetailsGuide />)

    expect(getByTestId('post-details-guide')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <PostDetailsGuide additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
