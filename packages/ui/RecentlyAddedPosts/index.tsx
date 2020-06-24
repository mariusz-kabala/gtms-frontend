import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { PostSingle } from '@gtms/ui/PostSingle'
import { IPost, IAccountDetails } from '@gtms/commons/models'

export const RecentlyAddedPosts: FC<{
  additionalStyles?: string
  posts: IPost[]
  user: IAccountDetails | null
  createComment: (payload: { post: string; text: string }) => unknown
  fetchTags: (query: string, signal: AbortSignal) => Promise<string[]>
  noImage: { [key: string]: { jpg: string; webp?: string } }
}> = ({ additionalStyles, posts, noImage, user, fetchTags, createComment }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-added-posts"
    >
      {posts.map((post) => (
        <PostSingle
          key={`post-${post.id}`}
          fetchTags={fetchTags}
          createComment={createComment}
          user={user}
          additionalStyles={styles.post}
          {...post}
          noImage={noImage}
        />
      ))}
    </div>
  )
}
