import React from 'react'
import { render } from '@testing-library/react'
import { RecentlyCreatedGroups } from './index'

describe('<RecentlyCreatedGroups />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<RecentlyCreatedGroups />)

    expect(getByTestId('recently-created-groups')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <RecentlyCreatedGroups additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
