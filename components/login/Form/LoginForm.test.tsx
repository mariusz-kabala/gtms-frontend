import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { LoginForm } from './index'

describe('<LoginForm />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<LoginForm onSuccess={jest.fn()} />)

    expect(getByTestId('login-form')).toBeInTheDocument()
  })
})
