import React, { FC } from 'react'
import { IGroup, IUser } from '@gtms/commons/models'
import { getImage, getDisplayName } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
// ui
import { Picture } from '../Picture'
// styles
import styles from './styles.scss'

export const NotificationNewMember: FC<{
  group: IGroup
  member: IUser
}> = ({ group, member }) => {
  return (
    <li className={styles.wrapper} data-testid={'notification-new-member'}>
      <Link href={`/member/${member._id}`}>
        <a>
          <Picture
            additionalStyles={styles.avatar}
            {...getImage('50x50', member.avatar)}
          />
          <h3>{getDisplayName(member)}</h3>
          <span>Joined to:</span>
        </a>
      </Link>
      <Link href={`/group/${group.slug}`}>
        <a className={styles.group}>
          <Picture
            additionalStyles={styles.avatar}
            {...getImage('50x50', group.avatar)}
          />
          <h3>{group.name}</h3>
        </a>
      </Link>
    </li>
  )
}
