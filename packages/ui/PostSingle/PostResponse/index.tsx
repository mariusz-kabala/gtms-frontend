import React, { FC, useState } from 'react'
import cx from 'classnames'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import { UserAvatarNoImage } from 'enums'
import { IImage } from '@gtms/commons/types/image'
import { IAccountDetails, IUser } from '@gtms/commons/models'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
// ui
import { DeletePost } from '../DeletePost'
import { Modal } from '@gtms/ui/Modal'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { UserPreview } from '@gtms/ui/UserPreview'
import styles from './styles.scss'

export const PostResponse: FC<{
  additionalStyles?: string
  createdAt: string
  html: string
  noImage: { [key: string]: IImage }
  owner: IUser
  user: IAccountDetails | null
}> = ({ additionalStyles, createdAt, html, noImage, owner, user }) => {
  const [userPreview, setUserPreview] = useState(false)

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="post-single"
    >
      {userPreview && <Modal onClose={() => setUserPreview(false)}></Modal>}
      <div className={styles.header}>
        <div className={styles.user}>
          <UserAvatar
            additionalStyles={styles.userAvatar}
            image={getImage('35x35', owner.avatar, noImage)}
            onClick={() => setUserPreview(true)}
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
