import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Button } from './index'

describe('<Button />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <Button onClick={() => null}>
        <a>testing</a>
      </Button>
    )

    expect(getByTestId('action-button')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on button', () => {
    const onClick = jest.fn()

    const { getByTestId } = render(
      <Button onClick={onClick}>
        <a>testing</a>
      </Button>
    )

    fireEvent.click(getByTestId('action-button'))

    expect(onClick).toBeCalled()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <Button onClick={() => null} additionalStyles={'cssTest'}>
        <a>testing</a>
      </Button>
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
