import React from 'react'
import { render } from '@testing-library/react'
import { Error } from './index'

describe('<Checkbox />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container, getByText } = render(
      <Error text="Error" additionalStyles={'testingStyles'} />
    )

    expect(getByTestId('form-error')).toBeInTheDocument()
    expect(container.querySelector('.testingStyles')).toBeInTheDocument()
    expect(getByText('Error')).toBeInTheDocument()
  })
})
