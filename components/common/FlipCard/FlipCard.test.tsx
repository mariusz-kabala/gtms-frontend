import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { FlipCard } from './index'
import styles from './styles.scss'

describe('<FlipCard />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <FlipCard back={<div>BACK</div>} clickOutside={false} isActive={false}>
        <div>FRONT</div>
      </FlipCard>
    )

    expect(getByTestId('flip-card')).toBeInTheDocument()
  })

  it('Should have active class when state is active', () => {
    const { container } = render(
      <FlipCard back={<div>BACK</div>} clickOutside={false} isActive={true}>
        <div>FRONT</div>
      </FlipCard>
    )

    expect(container.querySelector(`.${styles.active}`)).toBeInTheDocument()
  })

  it('Should not be active when clicking outside', () => {
    const { container } = render(
      <FlipCard back={<div>BACK</div>} clickOutside={true} isActive={true}>
        <div>FRONT</div>
      </FlipCard>
    )

    fireEvent.mouseDown(document)

    expect(container.querySelector(`.${styles.active}`)).not.toBeInTheDocument()
  })

  it('Should register event listner on document', () => {
    // eslint-disable-next-line
    const events: any = {}
    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })

    const { container } = render(
      <FlipCard back={<div>BACK</div>} clickOutside={false} isActive={true}>
        <div>FRONT</div>
      </FlipCard>
    )

    expect(document.addEventListener).toBeCalled()

    act(() => {
      events.keydown({ keyCode: 27, which: 27, key: 'Escape' })
    })
    expect(container.querySelector(`.${styles.active}`)).not.toBeInTheDocument()
  })
})
