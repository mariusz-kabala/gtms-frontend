import React from 'react'
import { render } from '@testing-library/react'
import { TagGroup } from './index'
import styles from './styles.scss'

describe('<TagGroup />', () => {
  it('Should be on the page', () => {
    const { getByTestId, getByText, container } = render(
      <TagGroup>
        <span>content</span>
      </TagGroup>
    )

    expect(getByTestId('tag-group')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.tagGroup}`)).toBeInTheDocument()
    expect(getByText('content')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <TagGroup additionalStyles={'testingClass'}>
        <span />
      </TagGroup>
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
