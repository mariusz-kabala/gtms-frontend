import React, { FC } from 'react'
import cx from 'classnames'
// ui
import { PostSingle } from '../PostSingle'
// commons
import { IPost, IAccountDetails } from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
// styles
import styles from './styles.scss'

export const RecentlyAddedPosts: FC<{
  additionalStyles?: string
  onPostClick?: (id: string) => unknown
  posts: IPost[]
  activePost?: IPost
  user: IAccountDetails | null
  createComment: (payload: { post: string; text: string }) => unknown
  fetchTags: (query: string, signal: AbortSignal) => Promise<string[]>
  noImage: { [key: string]: IImage }
}> = ({
  additionalStyles,
  posts,
  noImage,
  user,
  fetchTags,
  createComment,
  onPostClick,
  activePost,
}) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-added-posts"
    >
      {posts.map((post) => (
        <PostSingle
          key={`post-${post.id}`}
          onClick={onPostClick}
          fetchTags={fetchTags}
          createComment={createComment}
          user={user}
          additionalStyles={cx(styles.post, {
            [styles.active]: activePost?.id === post.id,
          })}
          {...post}
          noImage={noImage}
        />
      ))}
    </div>
  )
}
