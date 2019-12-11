import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { Modal } from './index'
import styles from './styles.scss'

describe('<Modal />', () => {
  it('Should be on the page', () => {
    const { getByTestId, getByText, container } = render(
      <Modal onClose={() => null}>
        <span>content</span>
      </Modal>
    )

    expect(getByTestId('modal')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.modal}`)).toBeInTheDocument()
    expect(getByText('content')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <Modal additionalStyles={'testingClass'} onClose={() => null}>
        <span />
      </Modal>
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on overlay', () => {
    const onClose = jest.fn()

    const { getByTestId } = render(
      <Modal additionalStyles={'testingClass'} onClose={onClose}>
        <span>content</span>
      </Modal>
    )

    fireEvent.click(getByTestId('overlay'))

    expect(onClose).toBeCalled()
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
      </Modal>
    )

    expect(getByTestId('modal')).toBeInTheDocument()

    expect(document.addEventListener).toBeCalled()

    act(() => {
      events.keydown({ keyCode: 27, which: 27, key: 'Escape' })
    })

    expect(onClose).toBeCalled()
  })
})
