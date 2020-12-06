import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { UserName } from './index'

describe('<UserName />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<UserName />)

    expect(getByTestId('user-name')).toBeInTheDocument()
  })

  it('Should open edit mode of user name when clicked on <UserName /> ', () => {
    const { getByTestId } = render(<UserName />)

    fireEvent.click(getByTestId('user-name'))

    expect(getByTestId('user-name-change-form')).toBeInTheDocument()
  })

  // @todo this should be fixed?
  it.skip('Should close edit mode when user cancel editing by pressing ESC key', () => {
    // eslint-disable-next-line
    const events: any = {}
    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })

    const { getByTestId, queryByTestId } = render(<UserName />)

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
    const { getByTestId, queryByTestId } = render(<UserName />)

    fireEvent.click(getByTestId('user-name'))

    expect(getByTestId('user-name-change-form')).toBeInTheDocument()
    expect(getByTestId('overlay')).toBeInTheDocument()

    fireEvent.click(getByTestId('overlay'))

    expect(queryByTestId('user-name-change-form')).toBeNull()
    expect(queryByTestId('overlay')).toBeNull()
  })
})
