import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { Sidebar } from './index'
import styles from './styles.scss'

describe('<Sidebar />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <Sidebar isActive={false} onClose={jest.fn()}>
        <a>testing</a>
      </Sidebar>
    )

    expect(getByTestId('sidebar')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <Sidebar
        additionalStyles={'testingClass'}
        isActive={false}
        onClose={jest.fn()}
      >
        <a>testing</a>
      </Sidebar>
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })

  it('Should have leftSide class when neither leftSide prop or rightSide prop is not present', () => {
    const { container } = render(
      <Sidebar
        additionalStyles={'cssTest'}
        isActive={false}
        onClose={jest.fn()}
      >
        <a>testing</a>
      </Sidebar>
    )

    expect(container.querySelector(`.${styles.leftSide}`)).toBeInTheDocument()
  })

  it('Should have opened class when isActive prop is present', () => {
    const { container } = render(
      <Sidebar additionalStyles={'cssTest'} isActive={true} onClose={jest.fn()}>
        <a>testing</a>
      </Sidebar>
    )

    expect(container.querySelector(`.${styles.opened}`)).toBeInTheDocument()
  })

  it('Should have leftSide class when leftSide prop is present', () => {
    const { container } = render(
      <Sidebar
        additionalStyles={'cssTest'}
        isActive={false}
        leftSide={true}
        onClose={jest.fn()}
      >
        <a>testing</a>
      </Sidebar>
    )

    expect(container.querySelector(`.${styles.leftSide}`)).toBeInTheDocument()
  })

  it('Should have rightSide class when rightSide prop is present', () => {
    const { container } = render(
      <Sidebar
        additionalStyles={'cssTest'}
        isActive={false}
        rightSide={true}
        onClose={jest.fn()}
      >
        <a>testing</a>
      </Sidebar>
    )

    expect(container.querySelector(`.${styles.rightSide}`)).toBeInTheDocument()
  })

  it('Should trigger onClose callback when clicking on Overlay component', () => {
    const onClose = jest.fn()

    const { getByTestId } = render(
      <Sidebar additionalStyles={'cssTest'} isActive={true} onClose={onClose}>
        <a>testing</a>
      </Sidebar>
    )

    fireEvent.click(getByTestId('overlay'))

    expect(onClose).toBeCalled()
  })
})
