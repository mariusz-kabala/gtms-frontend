import React, { FC } from 'react'
import styles from './styles.scss'
import { IPost, IUser, IGroup } from '@gtms/commons/models'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { Picture } from '../Picture'

export const NotificationNewPost: FC<{
  post: IPost
  postOwner: IUser
  group: IGroup
}> = ({ group, postOwner, post }) => {
  return (
    <li className={styles.wrapper} data-testid={'notification-new-post'}>
      <div className={styles.groupHeader}>
        <Picture {...getImage('200x200', group.avatar)} />
        <h2>New post in {group.name}</h2>
      </div>
      <div className={styles.notification}>
        <Picture
          additionalStyles={styles.avatar}
          {...getImage('50x50', postOwner.avatar)}
        />
        <div className={styles.desc}>
          <h3>{getDisplayName(postOwner)}</h3>
          <p>{post.text}</p>
        </div>
      </div>
    </li>
  )
}
