import React from 'react'
import { render } from '@testing-library/react'
import { RecentlyRegisteredUsers } from './index'
import styles from './styles.scss'

describe('<RecentlyRegisteredUsers />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(<RecentlyRegisteredUsers />)

    expect(getByTestId('RecentlyRegisteredUsers')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
  })
})
