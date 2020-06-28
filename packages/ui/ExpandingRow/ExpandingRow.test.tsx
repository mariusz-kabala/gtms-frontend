import React from 'react'
import { render } from '@testing-library/react'
import { ExpandingRow } from './index'

describe('<ExpandingRow />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <ExpandingRow>
        <a>testing</a>
      </ExpandingRow>
    )

    expect(getByTestId('expanding-row')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <ExpandingRow additionalStyles={'cssTest'}>
        <a>testing</a>
      </ExpandingRow>
    )

    expect(container.querySelector('.cssTest')).toBeInTheDocument()
  })
})
