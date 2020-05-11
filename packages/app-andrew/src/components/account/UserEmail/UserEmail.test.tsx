import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { UserEmail } from './index'

describe('<UserEmail />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<UserEmail email="test@tester.com" />)

    expect(getByTestId('user-name')).toBeInTheDocument()
    expect(getByTestId('expanding-item')).toBeInTheDocument()
  })

  it('Should open edit mode of user name when clicked on <UserEmail /> ', () => {
    const { getByTestId } = render(<UserEmail email="test@tester.com" />)

    fireEvent.click(getByTestId('user-name'))

    expect(getByTestId('expanding-item')).toBeInTheDocument()
    expect(getByTestId('user-name-change-form')).toBeInTheDocument()
  })

  it('Should close edit mode when user cancel editing by pressing ESC key', () => {
    // eslint-disable-next-line
    const events: any = {}
    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })

    const { getByTestId, queryByTestId } = render(
      <UserEmail email="test@tester.com" />
    )

    expect(document.addEventListener).toBeCalled()

    expect(queryByTestId('user-name-change-form')).toBeNull()

    fireEvent.click(getByTestId('user-name'))

    expect(getByTestId('user-name-change-form')).toBeInTheDocument()
    expect(getByTestId('overlay')).toBeInTheDocument()

    act(() => {
      events.keydown({ keyCode: 27, which: 27, key: 'Escape' })
    })

    expect(queryByTestId('user-name-change-form')).toBeNull()
    expect(queryByTestId('overlay')).toBeNull()
  })

  it('Should close edit mode when user cancel editing by clicking on Overlay', () => {
    const { getByTestId, queryByTestId } = render(
      <UserEmail email="test@tester.com" />
    )

    fireEvent.click(getByTestId('user-name'))

    expect(getByTestId('user-name-change-form')).toBeInTheDocument()
    expect(getByTestId('overlay')).toBeInTheDocument()

    fireEvent.click(getByTestId('overlay'))

    expect(queryByTestId('user-name-change-form')).toBeNull()
    expect(queryByTestId('overlay')).toBeNull()
  })
})
