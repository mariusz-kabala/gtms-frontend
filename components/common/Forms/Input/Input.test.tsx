import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Input } from './index'

describe('<Input />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <Input additionalStyles={'testingStyles'} />
    )

    expect(getByTestId('formInput')).toBeInTheDocument()
    expect(container.querySelector('.testingStyles')).toBeInTheDocument()
  })

  it('Should render input placeholder', () => {
    const { getByPlaceholderText } = render(<Input placeholder={'testing'} />)

    expect(getByPlaceholderText('testing')).toBeInTheDocument()
  })

  it('Should render input default value', () => {
    const { getByDisplayValue } = render(<Input defaultValue={'testing'} />)

    expect(getByDisplayValue('testing')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on input', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<Input onClick={callback} />)

    fireEvent.click(getByTestId('formInput'))

    expect(callback).toBeCalledTimes(1)
  })
})
