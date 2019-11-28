import React from 'react'
import { render } from '@testing-library/react'
import { ImageCover } from './index'
import styles from './styles.scss'

describe('<ImageCover />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<ImageCover />)

    expect(getByTestId('image-cover')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })
})
