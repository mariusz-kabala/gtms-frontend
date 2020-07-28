import React from 'react'
import { render } from '@testing-library/react'
import { FullScreenGallery } from './index'

describe('<FullScreenGallery />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <FullScreenGallery isActive={true} onClose={jest.fn()} />
    )

    expect(getByTestId('full-screen-gallery')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <FullScreenGallery
        isActive={true}
        additionalStyles={'testingClass'}
        onClose={jest.fn()}
      >
        <span />
      </FullScreenGallery>
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
