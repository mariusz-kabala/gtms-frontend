import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { GroupDeleteGroup } from './index'

describe('<GroupDeleteGroup />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<GroupDeleteGroup onConfirm={jest.fn()} />, {
      container: document.body,
    })

    expect(getByTestId('delete-group')).toBeInTheDocument()
  })

  it('Should open modal when clicking on button', () => {
    const { getByTestId } = render(<GroupDeleteGroup onConfirm={jest.fn()} />, {
      container: document.body,
    })

    fireEvent.click(getByTestId('delete-group-button'))

    expect(getByTestId('modal')).toBeInTheDocument()
  })

  it('Should close modal when user cancel group deletion', () => {
    const { getByTestId, queryByTestId } = render(
      <GroupDeleteGroup onConfirm={jest.fn()} />,
      { container: document.body }
    )

    fireEvent.click(getByTestId('delete-group-button'))

    expect(getByTestId('modal')).toBeInTheDocument()

    fireEvent.click(getByTestId('delete-group-cancel'))

    expect(queryByTestId('modal')).toBeNull()
  })

  it('Should trigger callback when user confirm group deletion', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<GroupDeleteGroup onConfirm={callback} />)

    fireEvent.click(getByTestId('delete-group-button'))

    fireEvent.click(getByTestId('delete-group-confirm'))

    expect(callback).toBeCalledTimes(1)
  })
})
