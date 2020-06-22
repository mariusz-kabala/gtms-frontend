import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { DeletePost } from '../DeletePost'
import { UserAvatar } from '../../UserAvatar'
import ReactMarkdown from 'react-markdown'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import { Link } from '@gtms/commons/i18n'

export const PostResponse: FC<{
  text: string
  createdAt: string
  additionalStyles?: string
  owner: string
  // noImage: { [key: string]: { jpg: string; webp?: string } }
  noImage: any
}> = ({ additionalStyles, text, createdAt, owner, noImage }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="post-single"
    >
      <div className={styles.header}>
        <Link href={`/user/${owner}`}>
          <div className={styles.user}>
            <UserAvatar
              image={noImage['35x35']}
              additionalStyles={styles.userAvatar}
            />
            {/* @mariusz use this
              <UserAvatar
              image={
                owner.avatar?.status === FileStatus.ready
                  ? (owner.avatar.files['35x35'] as { jpg: string })
                  : noImage['35x35']
              }
              additionalStyles={styles.userAvatar}
            /> */}
            <span>{owner}</span>
            {/* <span>{`${owner.name || ''} ${owner.surname || ''}`.trim()}</span> */}
          </div>
        </Link>
        <span>
          {formatDistance(new Date(createdAt), new Date(), { locale: pl })}
        </span>
        <DeletePost additionalStyles={styles.deleteBtn} />
      </div>
      <div className={styles.desc}>
        <ReactMarkdown className={styles.text} source={text} />
      </div>
    </div>
  )
}
