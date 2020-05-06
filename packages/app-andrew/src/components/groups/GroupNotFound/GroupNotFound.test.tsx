import React from 'react'
import { render } from '@testing-library/react'
import { GroupNotFound } from './index'

describe('<GroupNotFound />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<GroupNotFound onConfirm={jest.fn()} />)

    expect(getByTestId('group-not-found')).toBeInTheDocument()
  })
})
