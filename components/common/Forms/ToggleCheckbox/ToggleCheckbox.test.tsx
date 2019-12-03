import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { ToggleCheckbox } from './index'

describe('<ToggleCheckbox />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <ToggleCheckbox additionalStyles={'testingStyles'} />
    )

    expect(getByTestId('toggle-checkbox')).toBeInTheDocument()
    expect(container.querySelector('.testingStyles')).toBeInTheDocument()
  })

  it('Should render label when checkbox is checked', () => {
    const { getByText } = render(
      <ToggleCheckbox labelChecked={'labelChecked'} />
    )

    expect(getByText('labelChecked')).toBeInTheDocument()
  })

  it('Should render label when checkbox is unchecked', () => {
    const { getByText } = render(
      <ToggleCheckbox labelUnchecked={'labelUnchecked'} />
    )

    expect(getByText('labelUnchecked')).toBeInTheDocument()
  })

  it('Should render checkbox locker icon', () => {
    const { getByTestId } = render(<ToggleCheckbox lockerIcon />)

    expect(getByTestId('toggle-checkbox-locker-icon')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on checkbox', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<ToggleCheckbox onChange={callback} />)

    fireEvent.click(getByTestId('toggle-checkbox'))

    expect(callback).toBeCalledTimes(1)
  })
})
