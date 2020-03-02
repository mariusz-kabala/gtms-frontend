import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { PushNotifications } from './index'

describe('<PushNotifications />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<PushNotifications />)

    expect(getByTestId('push-notifications-switcher')).toBeInTheDocument()
  })

  it('Should change checkbox to active', () => {
    const { container, getByTestId } = render(<PushNotifications />)

    // fireEvent.click(getByTestId('push-nofitications-switcher'))
    fireEvent.click(getByTestId('push-notifications-switcher'))
    expect(container.querySelector('.checked')).toBeInTheDocument()
  })
})
