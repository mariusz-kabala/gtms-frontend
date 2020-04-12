import React from 'react'
import { render } from '@testing-library/react'
import { PostSingle } from './index'

describe('<PostSingle />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<PostSingle />)

    expect(getByTestId('post-single')).toBeInTheDocument()
  })
})
