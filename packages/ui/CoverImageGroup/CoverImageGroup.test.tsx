import React from 'react'
import { render } from '@testing-library/react'
import { CoverImageGroup } from './index'

describe('<CoverImageGroup />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <CoverImageGroup setShowCoverImage={() => null} />
    )

    expect(getByTestId('cover-image-group')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <CoverImageGroup
        setShowCoverImage={() => null}
        additionalStyles={'cssTest'}
      />
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
