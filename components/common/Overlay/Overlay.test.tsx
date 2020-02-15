import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Overlay } from './index'

describe('<Overlay />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<Overlay />)

    expect(getByTestId('overlay')).toBeInTheDocument()
  })

  it('Should trigger provided callback when clicking on it', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<Overlay onClick={callback} />)

    fireEvent.click(getByTestId('overlay'))

    expect(callback).toBeCalledTimes(1)
  })
})
