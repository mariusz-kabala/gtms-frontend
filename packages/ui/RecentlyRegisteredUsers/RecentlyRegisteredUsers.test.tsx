import React from 'react'
import { render } from '@testing-library/react'
import { RecentlyRegisteredUsers } from './index'
import styles from './styles.scss'

describe('<RecentlyRegisteredUsers />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <RecentlyRegisteredUsers users={[]} />
    )

    expect(getByTestId('recently-registered-users')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.users}`)).toBeInTheDocument()
  })
})
