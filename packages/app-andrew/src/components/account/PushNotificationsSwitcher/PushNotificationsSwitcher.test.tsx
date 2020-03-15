import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { PushNotificationsSwitcher } from './index'

describe('<PushNotificationsSwitcher />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <PushNotificationsSwitcher onConfirm={jest.fn()} />
    )

    expect(getByTestId('delete-account')).toBeInTheDocument()
  })

  it('Should open modal when clicking on button', () => {
    const { getByTestId } = render(
      <PushNotificationsSwitcher onConfirm={jest.fn()} />
    )

    fireEvent.click(getByTestId('delete-account-button'))

    expect(getByTestId('modal')).toBeInTheDocument()
  })

  it('Should close modal when user cancel account deletion', () => {
    const { getByTestId, queryByTestId } = render(
      <PushNotificationsSwitcher onConfirm={jest.fn()} />
    )

    fireEvent.click(getByTestId('delete-account-button'))

    expect(getByTestId('modal')).toBeInTheDocument()

    fireEvent.click(getByTestId('delete-account-cancel'))

    expect(queryByTestId('modal')).toBeNull()
  })

  it('Should trigger callback when user confirm account deletion', () => {
    const callback = jest.fn()
    const { getByTestId } = render(
      <PushNotificationsSwitcher onConfirm={callback} />
    )

    fireEvent.click(getByTestId('delete-account-button'))

    fireEvent.click(getByTestId('delete-account-confirm'))

    expect(callback).toBeCalledTimes(1)
  })
})
