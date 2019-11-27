import React from 'react'
import { render } from '@testing-library/react'
import { Sidebar } from './index'

describe('<Sidebar />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <Sidebar isActive={false} onClose={() => null}>
        <a>testing</a>
      </Sidebar>
    )

    expect(getByTestId('sidebar')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { getByTestId } = render(
      <Sidebar
        additionalStyles={'cssTest'}
        isActive={false}
        onClose={() => null}
      >
        <a>testing</a>
      </Sidebar>
    )

    expect(getByTestId('sidebar')).toBeInTheDocument()
  })
})
