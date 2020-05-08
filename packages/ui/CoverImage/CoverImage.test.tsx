import React from 'react'
import { render } from '@testing-library/react'
import { CoverImage } from './index'

describe('<CoverImage />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <CoverImage />
    )

    expect(getByTestId('cover-image')).toBeInTheDocument()
  })
})
