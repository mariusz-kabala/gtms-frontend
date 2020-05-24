import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { DeletePost } from './DeletePost'
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { UserAvatar } from '../UserAvatar'
import ReactMarkdown from 'react-markdown'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import { IUser } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'

export const PostSingle: FC<{
  text: string
  createdAt: string
  additionalStyles?: string
  owner: IUser
  noImage: { [key: string]: { jpg: string; webp?: string } }
}> = ({ additionalStyles, text, createdAt, owner, noImage }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="post-single"
    >
      <div className={styles.header}>
        <UserAvatar
          image={
            owner.avatar?.status === FileStatus.ready
              ? (owner.avatar.files['35x35'] as { jpg: string })
              : noImage['35x35']
          }
          additionalStyles={styles.userAvatar}
        />
        <span>{`${owner.name || ''} ${owner.surname || ''}`.trim()}</span>
        <span>
          {formatDistance(new Date(createdAt), new Date(), { locale: pl })}
        </span>
        <DeletePost additionalStyles={styles.deleteBtn} />
      </div>
      <div className={styles.text}>
        <p>
          <ReactMarkdown source={text} />
        </p>
      </div>
      <TagGroup>
        <Tag label="tag" />
        <Tag label="tag" />
        <Tag label="tag" />
        <Tag label="tag" />
      </TagGroup>
    </div>
  )
}
