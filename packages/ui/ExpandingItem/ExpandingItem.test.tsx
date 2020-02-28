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

  it('Should have active class when state is active', () => {
    const { container } = render(
      <ExpandingItem label={<div>label</div>} isActive={true}>
        Expanded content
      </ExpandingItem>
    )

    expect(container.querySelector(`.${styles.content}`)).toBeInTheDocument()
  })
})
