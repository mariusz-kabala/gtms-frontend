import React from 'react'
import { render } from '@testing-library/react'
import { UserCardMini } from './index'

describe('<UserCardMini />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<UserCardMini image="/fake/img.png" />)

    expect(getByTestId('user-card-mini')).toBeInTheDocument()
  })
})
