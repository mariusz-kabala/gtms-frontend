import React from 'react'
import { render } from '@testing-library/react'
import { ExpandingItem } from './index'
import styles from './styles.scss'

describe('<ExpandingItem />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <ExpandingItem label={<div>label</div>} isActive={false}>
        Expanded content
      </ExpandingItem>
    )

    expect(getByTestId('expandingItem')).toBeInTheDocument()
  })

  it('Should display content when state is active', () => {
    const { getByTestId } = render(
      <ExpandingItem label={<div>label</div>} isActive={true}>
        Expanded content
      </ExpandingItem>
    )

    expect(getByTestId('expandingItemContent')).toBeInTheDocument()
  })

  it('Should display label when state is active', () => {
    const { getByTestId } = render(
      <ExpandingItem label={<div>label</div>} isActive={true}>
        Expanded content
      </ExpandingItem>
    )

    expect(getByTestId('expandingItemLabel')).toBeInTheDocument()
  })
})
