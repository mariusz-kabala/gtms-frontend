import React from 'react'
import { render } from '@testing-library/react'
import { ItemCarousel } from './index'

describe('<ItemCarousel />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <ItemCarousel
        data={[
          {
            id: 0,
            img: '/images/temp_images/logo-kreciolatv.png',
          },
        ]}
      />
    )

    expect(getByTestId('itemCarousel')).toBeInTheDocument()
  })
})
