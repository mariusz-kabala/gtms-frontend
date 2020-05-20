import React from 'react'
import { render } from '@testing-library/react'
import { NotificationSingle } from './index'
import styles from './styles.scss'

describe('<NotificationSingle />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <NotificationSingle isActive={false} onClose={jest.fn()} />
    )

    expect(getByTestId('notification-single')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <NotificationSingle
        additionalStyles={'testingClass'}
        isActive={false}
        onClose={jest.fn()}
      />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })
})
