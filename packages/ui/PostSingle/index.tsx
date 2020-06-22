import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import ReactMarkdown from 'react-markdown'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import { IUser } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { Link } from '@gtms/commons/i18n'
import { DeletePost } from './DeletePost'
import { PostResponse } from './PostResponse'
import { Tag } from '../Tag'
import { TagGroup } from '../TagGroup'
import { UserAvatar } from '../UserAvatar'
import { UserAvatarNoImage } from '../../enums' // @todo remove it

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
        <Link href={`/user/${owner.id}`}>
          <div className={styles.user}>
            <UserAvatar
              image={
                owner.avatar?.status === FileStatus.ready
                  ? (owner.avatar.files['35x35'] as { jpg: string })
                  : noImage['35x35']
              }
              additionalStyles={styles.userAvatar}
            />
            <span>{`${owner.name || ''} ${owner.surname || ''}`.trim()}</span>
          </div>
        </Link>
        <span>
          {formatDistance(new Date(createdAt), new Date(), { locale: pl })}
        </span>
        <DeletePost additionalStyles={styles.deleteBtn} />
      </div>
      <div className={styles.desc}>
        <ReactMarkdown className={styles.text} source={text} />
        <TagGroup>
          <Tag label="tag" />
          <Tag label="tag" />
          <Tag label="tag" />
          <Tag label="tag" />
        </TagGroup>
        <div className={styles.action}>
          <a>Respond</a>
        </div>
        <PostResponse
          text='Reprehenderit minim aliquip culpa do ut incididunt nisi velit et exercitation.'
          createdAt='123123'
          owner='Larry Ellison'
          noImage={UserAvatarNoImage}
        />
        <PostResponse
          text='Elit laborum laboris occaecat minim commodo nostrud commodo minim Lorem sint'
          createdAt='123123'
          owner='Larry Ellison'
          noImage={UserAvatarNoImage}
        />
      </div>
    </div>
  )
}
