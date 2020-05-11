import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { ChangePassword } from './index'

describe('<ChangePassword />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<ChangePassword />)

    expect(getByTestId('user-password-change')).toBeInTheDocument()
    expect(getByTestId('expanding-item')).toBeInTheDocument()
  })

  it('Should open edit mode of user name when clicked on <ChangePassword /> ', () => {
    const { getByTestId } = render(<ChangePassword />)

    fireEvent.click(getByTestId('user-password-change'))

    expect(getByTestId('expanding-item')).toBeInTheDocument()
    expect(getByTestId('user-password-change-form')).toBeInTheDocument()
  })

  it.skip('Should close edit mode when user cancel editing by pressing ESC key', () => {
    // eslint-disable-next-line
    const events: any = {}
    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })

    const { getByTestId, queryByTestId } = render(<ChangePassword />)

    expect(document.addEventListener).toBeCalled()

    expect(queryByTestId('user-password-change-form')).toBeNull()

    fireEvent.click(getByTestId('user-password-change'))

    expect(getByTestId('user-password-change-form')).toBeInTheDocument()
    expect(getByTestId('overlay')).toBeInTheDocument()

    act(() => {
      events.keydown({ keyCode: 27, which: 27, key: 'Escape' })
    })

    expect(queryByTestId('user-password-change-form')).toBeNull()
    expect(queryByTestId('overlay')).toBeNull()
  })

  it.skip('Should close edit mode when user cancel editing by clicking on Overlay', () => {
    const { getByTestId, queryByTestId } = render(<ChangePassword />)

    fireEvent.click(getByTestId('user-password-change'))

    expect(getByTestId('user-password-change-form')).toBeInTheDocument()
    expect(getByTestId('overlay')).toBeInTheDocument()

    fireEvent.click(getByTestId('overlay'))

    expect(queryByTestId('user-password-change-form')).toBeNull()
    expect(queryByTestId('overlay')).toBeNull()
  })
})
