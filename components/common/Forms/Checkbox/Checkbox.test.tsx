import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Checkbox } from './index'

describe('<Checkbox />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <Checkbox additionalStyles={'testingStyles'} />
    )

    expect(getByTestId('form-checkbox')).toBeInTheDocument()
    expect(container.querySelector('.testingStyles')).toBeInTheDocument()
  })

  it('Should render checkbox label', () => {
    const { getByText } = render(<Checkbox label={'testing'} />)

    expect(getByText('testing')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on checkbox', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<Checkbox onChange={callback} />)

    fireEvent.click(getByTestId('form-checkbox'))

    expect(callback).toBeCalledTimes(1)
  })
})
