import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { ExpandingItem } from './index'

describe('<ExpandingItem />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <ExpandingItem
        label={<div>label</div>}
        isActive={false}
        onClose={jest.fn()}
      >
        Expanded content
      </ExpandingItem>
    )

    expect(getByTestId('expanding-item')).toBeInTheDocument()
  })

  it('Should display content when state is active', () => {
    const { getByTestId } = render(
      <ExpandingItem
        label={<div>label</div>}
        isActive={true}
        onClose={jest.fn()}
      >
        Expanded content
      </ExpandingItem>
    )

    expect(getByTestId('expanding-item-content')).toBeInTheDocument()
  })

  it('Should display label when state is active', () => {
    const { getByTestId } = render(
      <ExpandingItem
        label={<div>label</div>}
        isActive={false}
        onClose={jest.fn()}
      >
        Expanded content
      </ExpandingItem>
    )

    expect(getByTestId('expanding-item-label')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on modal wrapper (overlay)', () => {
    const onClose = jest.fn()

    const { getByTestId } = render(
      <ExpandingItem label={<div>label</div>} isActive={true} onClose={onClose}>
        <span>content</span>
      </ExpandingItem>
    )

    fireEvent.click(getByTestId('modal'))

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
      <ExpandingItem label={<div>label</div>} isActive={true} onClose={onClose}>
        <span>content</span>
      </ExpandingItem>
    )

    expect(getByTestId('expanding-item')).toBeInTheDocument()

    act(() => {
      events.keydown({ keyCode: 27, which: 27, key: 'Escape' })
    })

    expect(onClose).toBeCalledTimes(1)
  })

  it('Should add additional css classes', () => {
    const { container } = render(
      <ExpandingItem
        additionalStyles={'testingClass'}
        label={<div>label</div>}
        isActive={false}
        onClose={jest.fn()}
      >
        <span>content</span>
      </ExpandingItem>
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
