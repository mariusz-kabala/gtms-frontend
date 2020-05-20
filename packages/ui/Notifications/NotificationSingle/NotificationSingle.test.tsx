import React from 'react'
import { render } from '@testing-library/react'
import { NotificationSingle } from './index'
import styles from './styles.scss'

describe('<NotificationSingle />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <NotificationSingle isActive={false} onClose={jest.fn()} />
    )

    expect(getByTestId('NotificationSingle')).toBeInTheDocument()
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

  it('Should have opened class when isActive prop is present', () => {
    const { container } = render(
      <NotificationSingle
        additionalStyles={'cssTest'}
        isActive={true}
        onClose={jest.fn()}
      />
    )

    expect(container.querySelector(`.${styles.opened}`)).toBeInTheDocument()
  })
})
