import React from 'react'
import { render } from '@testing-library/react'
import { GroupCreate } from '../pages/group-create'

describe('<GroupCreate />', () => {
  it('Should render the page', () => {
    const { getByTestId } = render(<GroupCreate />)

    expect(getByTestId('group-create')).toBeInTheDocument()
  })
})
