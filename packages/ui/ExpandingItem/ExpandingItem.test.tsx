import React from 'react'
import { render } from '@testing-library/react'
import { ExpandingItem } from './index'

describe('<ExpandingItem />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <ExpandingItem label={<div>label</div>} isActive={false}>
        Expanded content
      </ExpandingItem>
    )

    expect(getByTestId('expanding-item')).toBeInTheDocument()
  })

  it('Should display content when state is active', () => {
    const { getByTestId } = render(
      <ExpandingItem label={<div>label</div>} isActive={true}>
        Expanded content
      </ExpandingItem>
    )

    expect(getByTestId('expanding-item-content')).toBeInTheDocument()
  })

  it('Should display label when state is active', () => {
    const { getByTestId } = render(
      <ExpandingItem label={<div>label</div>} isActive={false}>
        Expanded content
      </ExpandingItem>
    )

    expect(getByTestId('expanding-item-label')).toBeInTheDocument()
  })
})
