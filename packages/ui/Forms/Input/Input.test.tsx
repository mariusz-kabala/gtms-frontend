import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Input } from './index'

describe('<Input />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <Input additionalStyles={'testingStyles'} />
    )

    expect(getByTestId('form-input')).toBeInTheDocument()
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

    fireEvent.click(getByTestId('form-input'))

    expect(callback).toBeCalledTimes(1)
  })

  it('Should spread input atributes', () => {
    const inputAtributes = {
      alt: 'Custom alt',
      autoFocus: true,
    }
    const { getByTestId } = render(<Input atributes={inputAtributes} />)
    const inputElement = getByTestId('form-input')
    const altAtribute = inputElement.getAttribute('alt')
    expect(altAtribute).toBe(inputAtributes.alt)

    /*
      Why falsy instead of truthly, even if we pass `autoFocus: true`?
      From: https://blog.danieljohnson.io/react-ref-autofocus/
      `React team decided the autofocus attribute had too many cross-browser inconsistencies.
      So they polyfilled the behavior. When you pass an autoFocus prop,
      React will internally call focus() when the input element mounts`
    */
    expect(inputElement.autofocus).toBeFalsy()

    const isInputFocused = document.activeElement === inputElement
    expect(isInputFocused).toBeTruthy()
  })
})
