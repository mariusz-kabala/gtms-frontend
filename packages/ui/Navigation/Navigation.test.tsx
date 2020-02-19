import React from 'react'
import { render } from '@testing-library/react'
import { Navigation } from './index'
import styles from './styles.scss'

describe('<Navigation />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<Navigation />)

    expect(getByTestId('navigation')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })
})
