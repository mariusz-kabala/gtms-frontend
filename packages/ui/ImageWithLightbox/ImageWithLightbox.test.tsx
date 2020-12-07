import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ImageWithLightbox } from './index'
import styles from './styles.scss'

describe('<ImageWithLightbox />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <ImageWithLightbox src={{ jpg: 'url' }} additionalStyles="loremIpsum" />
    )

    expect(getByTestId('image-with-lightbox')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on image', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <ImageWithLightbox src={{ jpg: 'url' }} onClick={onClick} />
    )
    fireEvent.click(getByTestId('image-with-lightbox'))

    expect(onClick).toBeCalledTimes(1)
  })

  it('Should open a modal when clicking on image', () => {
    const onClick = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <ImageWithLightbox src={{ jpg: 'url' }} onClick={onClick} />
    )

    fireEvent.click(getByTestId('image-with-lightbox'))
    expect(getByTestId('modal')).toBeInTheDocument()

    fireEvent.click(getByTestId('overlay'))
    expect(queryByTestId('modal')).toBeNull()
  })

  it('Should trigger fallback when clicking on image and onClick func is not provided', () => {
    const { getByTestId } = render(<ImageWithLightbox src={{ jpg: 'url' }} />)
    fireEvent.click(getByTestId('image-with-lightbox'))
  })
})
