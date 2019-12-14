import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ToggleCheckbox } from './index'

describe('<ToggleCheckbox />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<ToggleCheckbox />)

    expect(getByTestId('toggle-checkbox')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on checkbox', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<ToggleCheckbox onChange={callback} />)

    fireEvent.click(getByTestId('toggle-checkbox'))

    expect(callback).toBeCalledTimes(1)
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <ToggleCheckbox additionalStyles={'testingStyles'} />
    )

    expect(container.querySelector('.testingStyles')).toBeInTheDocument()
  })
})
