import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { PostCreate } from '@gtms/ui/PostCreate'
import { PostSingle } from '@gtms/ui/PostSingle'

export const RecentlyAddedPosts: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-added-posts"
    >
      <PostCreate additionalStyles={styles.postCreate} />
      <PostSingle additionalStyles={styles.post} />
      <PostSingle additionalStyles={styles.post} />
      <PostSingle additionalStyles={styles.post} />
      <PostSingle additionalStyles={styles.post} />
      <PostSingle additionalStyles={styles.post} />
      <PostSingle additionalStyles={styles.post} />
    </div>
  )
}
