import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { HamburgerIcon } from './index'

describe('<HamburgerIcon />', () => {
  it('Should be on the page', () => {
    const onClick = jest.fn()

    const { getByTestId } = render(
      <HamburgerIcon onClick={onClick}>
        <a>testing</a>
      </HamburgerIcon>
    )

    expect(getByTestId('close-icon')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const onClick = jest.fn()

    const { container } = render(
      <HamburgerIcon additionalStyles={'cssTest'} onClick={onClick}>
        <a>testing</a>
      </HamburgerIcon>
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })

  it('Should trigger provided callback when clicking on it', () => {
    const callback = jest.fn()

    const { getByTestId } = render(<HamburgerIcon onClick={callback} />)

    fireEvent.click(getByTestId('close-icon'))

    expect(callback).toBeCalledTimes(1)
  })
})
