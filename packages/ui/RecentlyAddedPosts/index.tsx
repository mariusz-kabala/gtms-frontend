import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { PostSingle } from '@gtms/ui/PostSingle'
import { IPost } from '@gtms/commons/models'

export const RecentlyAddedPosts: FC<{
  additionalStyles?: string
  posts: IPost[]
  noImage: { [key: string]: { jpg: string; webp?: string } }
}> = ({ additionalStyles, posts, noImage }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-added-posts"
    >
      {posts.map((post) => (
        <PostSingle
          key={`post-${post.id}`}
          additionalStyles={styles.post}
          {...post}
          noImage={noImage}
        />
      ))}
    </div>
  )
}
