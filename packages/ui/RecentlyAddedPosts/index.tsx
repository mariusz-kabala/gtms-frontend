import React, { FC } from 'react'
import cx from 'classnames'
// commons
import { IPost, IAccountDetails, IUser } from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
// ui
import { PostSingle } from '../PostSingle'
// styles
import styles from './styles.scss'

export const RecentlyAddedPosts: FC<{
  additionalStyles?: string
  onPostClick?: (id: string) => unknown
  onTagClick?: (tag: string) => unknown
  onUserClick?: (id: IUser) => unknown
  posts: IPost[]
  activePost?: IPost
  user: IAccountDetails | null
  createComment: (payload: { post: string; text: string }) => unknown
  fetchTags: (query: string, signal: AbortSignal) => Promise<string[]>
  fetchUsers: (query: string, signal: AbortSignal) => Promise<string[]>
  noImage: { [key: string]: IImage }
  onLoginRequest?: () => unknown
  renderFavs?: (favs: string[], id: string) => JSX.Element
  activeTags?: string[]
}> = ({
  additionalStyles,
  posts,
  noImage,
  user,
  fetchTags,
  fetchUsers,
  createComment,
  onPostClick,
  onTagClick,
  onUserClick,
  activePost,
  renderFavs,
  onLoginRequest,
  activeTags = [],
}) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="recently-added-posts"
    >
      {posts.map((post) => (
        <PostSingle
          key={`post-${post.id}`}
          renderFavs={renderFavs}
          allowToRespond={post.id !== activePost?.id}
          onClick={onPostClick}
          onTagClick={onTagClick}
          onUserClick={onUserClick}
          fetchTags={fetchTags}
          fetchUsers={fetchUsers}
          createComment={createComment}
          user={user}
          additionalStyles={cx(styles.post, {
            [styles.active]: activePost?.id === post.id,
          })}
          {...post}
          noImage={noImage}
          onLoginRequest={onLoginRequest}
          activeTags={activeTags}
        />
      ))}
    </div>
  )
}
