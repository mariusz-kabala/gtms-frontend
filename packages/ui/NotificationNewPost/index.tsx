import React, { FC } from 'react'
import { IPost, IUser, IGroup } from '@gtms/commons/models'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { Link } from '@gtms/commons/i18n'
// ui
import styles from './styles.scss'
import { Picture } from '../Picture'

export const NotificationNewPost: FC<{
  post: IPost
  postOwner: IUser
  group: IGroup
}> = ({ group, postOwner, post }) => {
  return (
    <li data-testid={'notification-new-post'}>
      <Link href={`/group/${group.id}/post/${post.id}`}>
        <a>
          <div className={styles.notificationHeader}>
            <div className={styles.user}>
              <Picture
                additionalStyles={styles.avatar}
                {...getImage('50x50', postOwner.avatar)}
              />
              <h3 className={styles.header}>{getDisplayName(postOwner)}</h3>
              <span>wrote in:</span>
            </div>
            <div className={styles.group}>
              <Picture
                additionalStyles={styles.avatar}
                {...getImage('200x200', group.avatar)}
              />
              <h2 className={styles.header}>{group.name}</h2>
            </div>
          </div>
          <p className={styles.text}>{post.text}</p>
        </a>
      </Link>
    </li>
  )
}
