import React, { FC } from 'react'
import cx from 'classnames'
import { DeletePost } from '../DeletePost'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import { IImage } from '@gtms/commons/types/image'
import { IAccountDetails, IUser } from '@gtms/commons/models'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { showUserPreview } from 'state/userPreview'
// ui
import { UserAvatar } from '@gtms/ui/UserAvatar'
// styles
import styles from './styles.scss'

export const PostResponse: FC<{
  html: string
  createdAt: string
  additionalStyles?: string
  owner: IUser
  noImage: { [key: string]: IImage }
  user: IAccountDetails | null
}> = ({ additionalStyles, html, createdAt, owner, noImage, user }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="post-single"
    >
      <div className={styles.header}>
        <div className={styles.user}>
          <UserAvatar
            additionalStyles={styles.userAvatar}
            image={getImage('35x35', owner.avatar, noImage)}
            onClick={() => showUserPreview(owner)}
          />
          <span>{getDisplayName(owner)}</span>
        </div>
        {createdAt && (
          <span>
            {formatDistance(new Date(createdAt), new Date(), { locale: pl })}
          </span>
        )}
        {user?.id === owner.id && (
          <DeletePost additionalStyles={styles.deleteBtn} />
        )}
      </div>
      <div className={styles.desc}>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
