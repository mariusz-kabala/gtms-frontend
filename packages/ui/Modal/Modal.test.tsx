import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { Modal } from './index'

describe('<Modal />', () => {
  it('Should be on the page', () => {
    const { getByTestId, getByText } = render(
      <Modal onClose={jest.fn()}>
        <span>content</span>
      </Modal>
    )

    expect(getByTestId('modal')).toBeInTheDocument()
    expect(getByText('content')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <Modal additionalStyles={'testingClass'} onClose={jest.fn()}>
        <span />
      </Modal>,
      { container: document.body }
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on modal wrapper (overlay)', () => {
    const onClose = jest.fn()

    const { getByTestId } = render(
      <Modal additionalStyles={'testingClass'} onClose={onClose}>
        <span>content</span>
      </Modal>,
      { container: document.body }
    )

    fireEvent.click(getByTestId('overlay'))

    expect(onClose).toBeCalledTimes(1)
  })

  it('Should register event listner on document', () => {
    const onClose = jest.fn()

    // eslint-disable-next-line
    const events: any = {}
    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })

    const { getByTestId } = render(
      <Modal additionalStyles={'testingClass'} onClose={onClose}>
        <span>content</span>
      </Modal>,
      { container: document.body }
    )

    expect(getByTestId('modal')).toBeInTheDocument()

    act(() => {
      events.keydown({ keyCode: 27, which: 27, key: 'Escape' })
    })

    expect(onClose).toBeCalledTimes(1)
  })
})
