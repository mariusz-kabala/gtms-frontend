import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { InviteFriends } from './index'

describe('<InviteFriends />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<InviteFriends onClick={jest.fn()} />)

    expect(getByTestId('overlay')).toBeInTheDocument()
  })

  it('Should trigger provided callback when clicking on it', () => {
    const callback = jest.fn()
    const { getByTestId } = render(<InviteFriends onClick={callback} />)

    fireEvent.click(getByTestId('overlay'))

    expect(callback).toBeCalledTimes(1)
  })
})
