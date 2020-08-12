import React from 'react'
import { render } from '@testing-library/react'
import { CoverImageGroup } from './index'

describe('<CoverImageGroup />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <CoverImageGroup setShowCoverImage={false} />
    )

    expect(getByTestId('cover-image-group')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <CoverImageGroup setShowCoverImage={false} additionalStyles={'cssTest'} />
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
