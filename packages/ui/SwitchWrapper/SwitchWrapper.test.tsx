import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SwitchWrapper } from './index'

describe('<SwitchWrapper />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<SwitchWrapper onClick={jest.fn()} />)

    expect(getByTestId('switch-wrapper')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <SwitchWrapper additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })

  it('Should trigger provided callback when clicking on it', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<SwitchWrapper onClick={callback} />)

    fireEvent.click(getByTestId('switch-wrapper'))

    expect(callback).toBeCalledTimes(1)
  })
})
