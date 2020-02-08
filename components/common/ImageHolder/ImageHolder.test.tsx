import React from 'react'
import { render } from '@testing-library/react'
import { ImageHolder } from './index'
import styles from './styles.scss'

describe('<ImageHolder />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<ImageHolder src={'url'} />)

    expect(getByTestId('imageHolder')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })
})
