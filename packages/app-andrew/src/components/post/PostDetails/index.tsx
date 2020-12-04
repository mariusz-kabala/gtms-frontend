import React, { FC } from 'react'
import cx from 'classnames'
import { IPost, IAccountDetails, IComment } from '@gtms/commons/models'
import { PostSingle } from '@gtms/ui/PostSingle'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
import { UserAvatarNoImage } from 'enums'
import { createNewComment } from '@gtms/state-post'
import { PostCommentsList } from '../../comments/PostCommentsList'
import styles from './styles.scss'

export const PostDetails: FC<{
  additionalStyles?: string
  activeTags?: string[]
  comments?: {
    comments: IComment[]
    errorOccured: boolean
    isLoading: boolean
    limit: number
    offset: number
    total: number
  }
  post: IPost
  user: IAccountDetails | null
}> = ({ additionalStyles, activeTags = [], comments, post, user }) => {
  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      <PostSingle
        activeTags={activeTags}
        allowToRespond={true}
        createComment={createNewComment}
        createdAt={post.createdAt}
        fetchTags={findTagsAPI}
        fetchUsers={findbyUsernameAPI}
        firstComments={[]}
        html={post.html}
        id={post.id}
        images={post.images}
        noImage={UserAvatarNoImage}
        owner={post.owner}
        tags={post.tags}
        user={user}
      />
      {comments && (
        <PostCommentsList postId={post.id} user={user} {...comments} />
      )}
    </div>
  )
}
