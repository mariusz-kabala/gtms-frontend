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
      <Link href={`/group/${group.slug}`}>
        <a className={styles.group}>
          <Picture
            additionalStyles={styles.groupAvatar}
            {...getImage('50x50', group.avatar)}
          />
          <h2 className={styles.header}>New member in {group.name}</h2>
        </a>
      </Link>
      <p>
        <Link href={`/member/${member.id}`}>
          <a>
            <Picture
              additionalStyles={styles.groupAvatar}
              {...getImage('50x50', member.avatar)}
            />
          </a>
        </Link>
        <Link href={`/member/${member.id}`}>
          <a>{getDisplayName(member)}</a>
        </Link>{' '}
        just joined to the group!
      </p>
    </li>
  )
}
