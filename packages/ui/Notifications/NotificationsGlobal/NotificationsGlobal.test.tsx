import React from 'react'
import { render } from '@testing-library/react'
import { NotificationsGlobal } from './index'

describe('<NotificationsSidebar />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(<NotificationsGlobal onClose={jest.fn()} />)

    expect(getByTestId('notifications-global')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <NotificationsGlobal
        additionalStyles={'testingClass'}
        isActive={false}
        onClose={jest.fn()}
      />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
