import React from 'react'
import { render } from '@testing-library/react'
import { Logo } from './index'
import styles from './styles.scss'

describe('<Logo />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<Logo />)

    expect(getByTestId('logo')).toBeInTheDocument()
    expect(container.querySelector('img')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.logo}`)).toBeInTheDocument()
  })
})
