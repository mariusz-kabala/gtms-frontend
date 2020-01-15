import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Textarea } from './index'

describe('<Textarea />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <Textarea additionalStyles={'testingStyles'} />
    )

    expect(getByTestId('formTextarea')).toBeInTheDocument()
    expect(container.querySelector('.testingStyles')).toBeInTheDocument()
  })

  it('Should render textarea placeholder', () => {
    const { getByPlaceholderText } = render(<Textarea placeholder={'testing'} />)

    expect(getByPlaceholderText('testing')).toBeInTheDocument()
  })

  it('Should render textarea default value', () => {
    const { getByDisplayValue } = render(<Textarea defaultValue={'testing'} />)

    expect(getByDisplayValue('testing')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on textarea', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<Textarea onClick={callback} />)

    fireEvent.click(getByTestId('formTextarea'))

    expect(callback).toBeCalledTimes(1)
  })
})
