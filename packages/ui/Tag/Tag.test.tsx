import React from 'react'
import { render } from '@testing-library/react'
import { Tag } from './index'
import styles from './styles.scss'

describe('<Tag />', () => {
  it('Should be on the page', () => {
    const { getByTestId, getByText, container } = render(
      <Tag label="testing" />
    )

    expect(getByTestId('tag')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.tag}`)).toBeInTheDocument()
    expect(getByText('#testing')).toBeInTheDocument()
  })
})
