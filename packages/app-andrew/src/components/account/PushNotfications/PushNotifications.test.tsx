import React from 'react'
import { render } from '@testing-library/react'
import { PushNotifications } from './index'

describe('<PushNotifications />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<PushNotifications />)

    expect(getByTestId('push-notifications-switcher')).toBeInTheDocument()
  })
})
