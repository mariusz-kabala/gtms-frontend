import React from 'react'
import { render } from '@testing-library/react'
import { NotificationSingle } from './index'

describe('<NotificationSingle />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <NotificationSingle
        text="3 new users in your group"
        icon={{ jpg: '/images/temp_images/iconQuestionMark.png' }}
      />
    )

    expect(getByTestId('notification-single')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <NotificationSingle
        additionalStyles={'testingClass'}
        text="3 new users in your group"
        icon={{ jpg: '/images/temp_images/iconQuestionMark.png' }}
      />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
