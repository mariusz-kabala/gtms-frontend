import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import { GroupDescription } from './index'

describe('<GroupDescription />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <GroupDescription isEditAllowed={true} text={'example'} slug={'slug'} />
    )

    expect(getByTestId('group-edit-description')).toBeInTheDocument()
  })

  it('Should open edit mode of group description when clicked on <GroupDescription /> ', () => {
    const { getByTestId } = render(
      <GroupDescription isEditAllowed={true} text={'example'} slug={'slug'} />
    )

    fireEvent.click(getByTestId('group-edit-description'))

    expect(getByTestId('group-description-form')).toBeInTheDocument()
  })

  // @todo should it be fixed?
  it.skip('Should close edit mode when user cancel editing by pressing ESC key', () => {
    // eslint-disable-next-line
    const events: any = {}
    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb
    })

    const { getByTestId, queryByTestId } = render(
      <GroupDescription isEditAllowed={true} text={'example'} slug={'slug'} />
    )

    expect(document.addEventListener).toBeCalled()

    expect(queryByTestId('group-description-form')).toBeNull()

    fireEvent.click(getByTestId('group-edit-description'))

    expect(getByTestId('group-description-form')).toBeInTheDocument()
    expect(getByTestId('overlay')).toBeInTheDocument()

    act(() => {
      events.keydown({ keyCode: 27, which: 27, key: 'Escape' })
    })

    expect(queryByTestId('group-description-form')).toBeNull()
    expect(queryByTestId('overlay')).toBeNull()
  })

  it('Should close edit mode when user cancel editing by clicking on Overlay', () => {
    const { getByTestId, queryByTestId } = render(
      <GroupDescription isEditAllowed={true} text={'example'} slug={'slug'} />
    )

    fireEvent.click(getByTestId('group-edit-description'))

    expect(getByTestId('group-description-form')).toBeInTheDocument()
    expect(getByTestId('modal')).toBeInTheDocument()

    fireEvent.click(getByTestId('overlay'))

    expect(queryByTestId('group-description-form')).toBeNull()
    expect(queryByTestId('modal')).toBeNull()
  })
})
