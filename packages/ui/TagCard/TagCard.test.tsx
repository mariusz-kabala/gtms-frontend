import React from 'react'
import { render } from '@testing-library/react'
import { TagCard } from './index'

describe('<TagCard />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<TagCard image="/fake/img.png" />)

    expect(getByTestId('tag-card')).toBeInTheDocument()
  })
})
