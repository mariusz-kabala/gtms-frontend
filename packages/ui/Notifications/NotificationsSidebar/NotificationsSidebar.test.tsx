import React from 'react'
import { render } from '@testing-library/react'
import { NotificationsSidebar } from './index'
import styles from './styles.scss'

describe('<NotificationsSidebar />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <NotificationsSidebar isActive={false} onClose={jest.fn()} />
    )

    expect(getByTestId('notifications-sidebar')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <NotificationsSidebar
        additionalStyles={'testingClass'}
        isActive={false}
        onClose={jest.fn()}
      />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })

  it('Should have opened class when isActive prop is present', () => {
    const { container } = render(
      <NotificationsSidebar
        additionalStyles={'cssTest'}
        isActive={true}
        onClose={jest.fn()}
      />
    )

    expect(container.querySelector(`.${styles.opened}`)).toBeInTheDocument()
  })
})
