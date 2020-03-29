import React from 'react'
import { render } from '@testing-library/react'
import { ExpandingTextarea } from './index'

describe('<ExpandingTextarea />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<ExpandingTextarea name="example" />)

    expect(getByTestId('form-expanding-textarea')).toBeInTheDocument()
  })
})
