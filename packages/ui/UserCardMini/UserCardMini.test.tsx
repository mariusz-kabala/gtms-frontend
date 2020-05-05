import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { UserCardMini } from './index'

describe('<UserCardMini />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <UserCardMini name="Johnny Silverhand" image="/fake/img.png" />
    )

    expect(getByTestId('user-card-mini')).toBeInTheDocument()
  })

  it('Should trigger onClick callback when clicking on card', () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <UserCardMini
        name="Johnny Silverhand"
        image="/fake/img.png"
        onClick={onClick}
      />
    )
    fireEvent.click(getByTestId('user-card-mini'))

    expect(onClick).toBeCalledTimes(1)
  })
})
