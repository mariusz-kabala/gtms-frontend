import React from 'react'
import { render } from '@testing-library/react'
import { Notifications } from './index'
import styles from './styles.scss'

describe('<Notifications />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <Notifications isActive={false} onClose={jest.fn()} />
    )

    expect(getByTestId('notifications')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <Notifications
        additionalStyles={'testingClass'}
        isActive={false}
        onClose={jest.fn()}
      />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })

  it('Should have opened class when isActive prop is present', () => {
    const { container } = render(
      <Notifications
        additionalStyles={'cssTest'}
        isActive={true}
        onClose={jest.fn()}
      />
    )

    expect(container.querySelector(`.${styles.opened}`)).toBeInTheDocument()
  })
})
