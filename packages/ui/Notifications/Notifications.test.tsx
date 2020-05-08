import React from 'react'
import { render } from '@testing-library/react'
import { Notifications } from './index'
import styles from './styles.scss'

describe('<Notifications />', () => {
  it('Should be on the page', () => {
    const { getByTestId } = render(
      <Notifications isActive={false} />
    )

    expect(getByTestId('Notifications')).toBeInTheDocument()
  })

  it('Should have additional css classes', () => {
    const { container } = render(
      <Notifications
        additionalStyles={'testingClass'}
        isActive={false}
      />
    )

    expect(container.querySelector('.testingClass')).toBeInTheDocument()
  })

  it('Should have opened class when isActive prop is present', () => {
    const { container } = render(
      <Notifications additionalStyles={'cssTest'} isActive={true} />
    )

    expect(container.querySelector(`.${styles.opened}`)).toBeInTheDocument()
  })
})
