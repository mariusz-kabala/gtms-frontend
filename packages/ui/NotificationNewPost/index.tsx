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
    <li className={styles.wrapper} data-testid={'notification-new-post'}>
      <Link href={`/group/${group.id}/post/${post.id}`}>
        <a>
          <div className={styles.group}>
            <Picture
              additionalStyles={styles.groupAvatar}
              {...getImage('200x200', group.avatar)}
            />
            <h2 className={styles.header}>New post in {group.name}</h2>
          </div>
          <div className={styles.notification}>
            <Picture
              additionalStyles={styles.avatar}
              {...getImage('50x50', postOwner.avatar)}
            />
            <div className={styles.desc}>
              <h3 className={styles.header}>{getDisplayName(postOwner)}</h3>
              <p className={styles.text}>{post.text}</p>
            </div>
          </div>
        </a>
      </Link>
    </li>
  )
}
