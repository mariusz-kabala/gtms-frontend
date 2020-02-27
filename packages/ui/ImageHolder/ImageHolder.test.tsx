import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ImageHolder } from './index'
import styles from './styles.scss'

describe('<ImageHolder />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <ImageHolder src={'url'} additionalStyles="loremIpsum" />
    )

    expect(getByTestId('imageHolder')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on image', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <ImageHolder src={'url'} onClick={onClick} />
    )
    fireEvent.click(getByTestId('imageHolder'))

    expect(onClick).toBeCalledTimes(1)
  })

  it('Should open a modal when clicking on image', () => {
    const onClick = jest.fn()
    const { getByTestId, queryByTestId } = render(
      <ImageHolder src={'url'} onClick={onClick} />
    )

    fireEvent.click(getByTestId('imageHolder'))
    expect(getByTestId('overlay')).toBeInTheDocument()

    fireEvent.click(getByTestId('overlay'))
    expect(queryByTestId('overlay')).toBeNull()
  })

  it('Should trigger fallback when clicking on image and onClick func is not provided', () => {
    const { getByTestId } = render(<ImageHolder src={'url'} />)
    fireEvent.click(getByTestId('imageHolder'))
  })
})
