import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
// import { getImage } from '@gtms/commons/helpers'
// ui
import styles from './styles.scss'
// import { Picture } from '../Picture'

export const NotificationNewMember: FC<{
  group: IGroup
}> = () => {
  return (
    <li className={styles.wrapper} data-testid={'notification-new-member'}>
      <div className={styles.group}>
        {/* here I need group name, group avatar, member's info , name avatar link to profile */}
        {/* <Picture additionalStyles={styles.groupAvatar} {...getImage('200x200', group.avatar)} /> */}
        {/* <h2 className={styles.header}>New member in {group.name}</h2> */}
      </div>
    </li>
  )
}
