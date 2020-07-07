import React from 'react'
import { render } from '@testing-library/react'
import { SwitchWrapper } from './index'

describe('<SwitchWrapper />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <SwitchWrapper checked={false} onChange={jest.fn()} />
    )

    expect(getByTestId('switch-wrapper')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <SwitchWrapper
        checked={false}
        onChange={jest.fn()}
        additionalStyles={'testingClass'}
      />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
