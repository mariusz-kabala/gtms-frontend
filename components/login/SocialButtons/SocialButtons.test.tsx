import React from 'react'
import { render } from '@testing-library/react'
import { SocialButtons } from './index'

describe('<SocialButtons />', () => {
  it('Should render on the page', () => {
    const { getByTestId } = render(<SocialButtons onSuccess={jest.fn()} />)

    expect(getByTestId('social-buttons')).toBeInTheDocument()
  })

  it('Should render Google and Facebook login buttons', () => {
    // todo
  })

  it('Should trigger onSuccess callback after successful facebook login', () => {
    // todo
  })

  it('Should trigger onSuccess callback after successful google login', () => {
    // todo
  })
})
