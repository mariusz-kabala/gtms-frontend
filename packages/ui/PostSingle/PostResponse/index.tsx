import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { DeletePost } from '../DeletePost'
import { UserAvatar } from '../../UserAvatar'
import ReactMarkdown from 'react-markdown'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import { Link } from '@gtms/commons/i18n'
import { IImage } from '@gtms/commons/types/image'

export const PostResponse: FC<{
  text: string
  createdAt: string
  additionalStyles?: string
  owner: string
  image: IImage
}> = ({ additionalStyles, text, createdAt, owner, image }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="post-single"
    >
      <div className={styles.header}>
        <Link href={`/user/${owner}`}>
          <div className={styles.user}>
            <UserAvatar image={image} additionalStyles={styles.userAvatar} />
            <span>{owner}</span>
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
