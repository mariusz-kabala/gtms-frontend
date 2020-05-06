import React from 'react'
import { render } from '@testing-library/react'
import { ClickToCopy } from './index'

describe('<ClickToCopy />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<InviteFriends />)

    expect(getByTestId('click-to-copy')).toBeInTheDocument()
  })
})
