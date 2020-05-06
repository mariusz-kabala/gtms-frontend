import React from 'react'
import { render } from '@testing-library/react'
import { GroupCard } from './index'

describe('<GroupCard />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <GroupCard onClose={jest.fn()} image="/fake/img.png" />
    )

    expect(getByTestId('group-card')).toBeInTheDocument()
  })
})
