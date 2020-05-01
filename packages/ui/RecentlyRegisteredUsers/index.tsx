import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { UserAvatar } from '../UserAvatar'

export const RecentlyRegisteredUsers: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.invite}>
        <h3>Zaproś znajomych...</h3>
      </div>
      <ul
        className={cx(styles.users, additionalStyles)}
        data-testid="recently-registered-users">
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-1.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Tim Cook</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-2.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Larry Ellison</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-3.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Sundar Pichai</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-4.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Johnatan Ive</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-5.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Bill Atkinson</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-6.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Bill Fernandez</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-7.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Brad Silvenberg</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-8.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Chris Espinosa</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-9.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Daniel Kotke</span>
        </li>
        <li className={styles.user}>
          <UserAvatar
            image="/images/avatars/avatar-10.png"
            additionalStyles={styles.userAvatar}
          />
          <span>Mike Markkula</span>
        </li>
      </ul>
    </div>
  )
}
