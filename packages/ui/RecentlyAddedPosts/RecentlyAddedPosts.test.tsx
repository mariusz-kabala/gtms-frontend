import React from 'react'
import { render } from '@testing-library/react'
import { RecentlyAddedPosts } from './index'

describe('<RecentlyAddedPosts />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<RecentlyAddedPosts />)

    expect(getByTestId('recently-added-posts')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <RecentlyAddedPosts additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
