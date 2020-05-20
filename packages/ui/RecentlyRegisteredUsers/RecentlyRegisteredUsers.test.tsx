import React from 'react'
import { render } from '@testing-library/react'
import { RecentlyRegisteredUsers } from './index'
import { useTranslation } from '@gtms/commons/i18n'
import styles from './styles.scss'

describe('<RecentlyRegisteredUsers />', () => {
  it('Should be on the page', () => {
    const { getByTestId, container } = render(
      <RecentlyRegisteredUsers users={[]} />
    )

    expect(getByTestId('recently-registered-users')).toBeInTheDocument()
    expect(container.querySelector(`.${styles.wrapper}`)).toBeInTheDocument()
    expect(useTranslation).toBeCalledWith('recentlyRegisteredUsersComponent')
  })
})
