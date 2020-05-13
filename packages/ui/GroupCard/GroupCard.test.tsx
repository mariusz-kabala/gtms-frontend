import React from 'react'
import { render } from '@testing-library/react'
import { GroupCard } from './index'

describe('<GroupCard />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <GroupCard
        tags={[]}
        avatar={{ jpg: '/' }}
        name={'lorem ipsum'}
        slug={'lorem-ipsum'}
      />
    )

    expect(getByTestId('group-card')).toBeInTheDocument()
  })
})
