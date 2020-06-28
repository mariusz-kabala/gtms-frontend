import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { CloseIcon } from './index'

describe('<CloseIcon />', () => {
  it('Should be on the page', () => {
    const onClick = jest.fn()

    const { getByTestId } = render(
      <CloseIcon onClick={onClick}>
        <a>testing</a>
      </CloseIcon>
    )

    expect(getByTestId('close-icon')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const onClick = jest.fn()

    const { container } = render(
      <CloseIcon additionalStyles={'cssTest'} onClick={onClick}>
        <a>testing</a>
      </CloseIcon>
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })

  it('Should trigger provided callback when clicking on it', () => {
    const callback = jest.fn()

    const { getByTestId } = render(<CloseIcon onClick={callback} />)

    fireEvent.click(getByTestId('close-icon'))

    expect(callback).toBeCalledTimes(1)
  })
})
