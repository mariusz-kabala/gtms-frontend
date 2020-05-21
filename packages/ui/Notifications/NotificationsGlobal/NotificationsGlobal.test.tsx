import React from 'react'
import { render } from '@testing-library/react'
import { NotificationsGlobal } from './index'

describe('<NotificationsSidebar />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<NotificationsGlobal />)

    expect(getByTestId('notifications-global')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <NotificationsGlobal additionalStyles={'testingClass'} />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
