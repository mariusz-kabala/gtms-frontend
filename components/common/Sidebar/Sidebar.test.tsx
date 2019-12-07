import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'

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

  it('Should trigger onClose callback when clicking on Overlay component', () => {
    const onCloseCallback = jest.fn()

    const { getByTestId } = render(
      <Sidebar
        additionalStyles={'cssTest'}
        isActive={false}
        onClose={onCloseCallback}
      >
        <a>testing</a>
      </Sidebar>
    )

    act(() => {
      fireEvent.click(getByTestId('overlay'))
    })

    expect(onCloseCallback).toBeCalled()
  })
})
