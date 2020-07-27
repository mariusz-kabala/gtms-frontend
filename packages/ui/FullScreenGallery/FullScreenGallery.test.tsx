import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { FullScreenGallery } from './index'

describe('<FullScreenGallery />', () => {
  it('Should be on the page', () => {
    const { getByTestId, getByText } = render(
      <FullScreenGallery isActive={true} onClose={jest.fn()}>
        <span>content</span>
      </FullScreenGallery>
    )

    expect(getByTestId('fullScreenGallery')).toBeInTheDocument()
    expect(getByText('content')).toBeInTheDocument()
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <FullScreenGallery
        isActive={true}
        additionalStyles={'testingClass'}
        onClose={jest.fn()}
      >
        <span />
      </FullScreenGallery>
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on overlay', () => {
    const onClose = jest.fn()

    const { getByTestId } = render(
      <FullScreenGallery
        isActive={true}
        additionalStyles={'testingClass'}
        onClose={onClose}
      >
        <span>content</span>
      </FullScreenGallery>
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
      <FullScreenGallery
        isActive={true}
        additionalStyles={'testingClass'}
        onClose={onClose}
      >
        <span>content</span>
      </FullScreenGallery>
    )

    expect(getByTestId('fullScreenGallery')).toBeInTheDocument()

    act(() => {
      events.keydown({ keyCode: 27, which: 27, key: 'Escape' })
    })

    expect(onClose).toBeCalledTimes(1)
  })
})
