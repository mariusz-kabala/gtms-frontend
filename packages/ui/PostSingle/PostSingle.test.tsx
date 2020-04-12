import React from 'react'
import { render } from '@testing-library/react'
import { PostSingle } from './index'
import styles from './styles.scss'

describe('<PostSingle />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<PostSingle />)

    expect(getByTestId('postsingle')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })
})
