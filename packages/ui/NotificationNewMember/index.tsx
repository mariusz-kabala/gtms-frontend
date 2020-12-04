import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
// import { getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
// ui
import styles from './styles.scss'
// import { Picture } from '../Picture'

export const NotificationNewMember: FC<{
  group: IGroup
}> = () => {
  return (
    <li className={styles.wrapper} data-testid={'notification-new-member'}>
      <Link href="user/5ebd780058fe5306646b804f">
        <a className={styles.group}>
          {/* here I need group name, group avatar, member's info , name avatar, user id */}
          {/* <Picture additionalStyles={styles.groupAvatar} {...getImage('200x200', group.avatar)} /> */}
          {/* <h2 className={styles.header}>New member in {group.name}</h2> */}
        </a>
      </Link>
    </li>
  )
}
