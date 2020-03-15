import React from 'react'
import { render } from '@testing-library/react'
import { PushNotificationsSwitcher } from './index'

describe('<PushNotificationsSwitcher />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<PushNotificationsSwitcher />)

    expect(getByTestId('push-notifications-switcher')).toBeInTheDocument()
  })
})
