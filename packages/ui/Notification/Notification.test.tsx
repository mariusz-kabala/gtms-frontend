import React from 'react'
import { render } from '@testing-library/react'
import { Notification } from './index'

describe('<Notification />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <Notification
        text="3 new users in your group"
        icon={{ jpg: '/images/temp_images/iconQuestionMark.png' }}
      />
    )

    expect(getByTestId('notification-single')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <Notification
        additionalStyles={'testingClass'}
        text="3 new users in your group"
        icon={{ jpg: '/images/temp_images/iconQuestionMark.png' }}
      />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
