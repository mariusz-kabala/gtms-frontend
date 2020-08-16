import React, { FC } from 'react'
import styles from './styles.scss'
import { IPost, IAccountDetails, IComment } from '@gtms/commons/models'
import { PostSingle } from '@gtms/ui/PostSingle'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
import { UserAvatarNoImage } from 'enums'
import { createNewComment } from '@gtms/state-post'
import { PostCommentsList } from '../../comments/PostCommentsList'

export const PostDetails: FC<{
  post: IPost
  activeTags?: string[]
  user: IAccountDetails | null
  comments?: {
    isLoading: boolean
    errorOccured: boolean
    total: number
    offset: number
    limit: number
    comments: IComment[]
  }
}> = ({ post, user, comments, activeTags = [] }) => {
  return (
    <div className={styles.wrapper}>
      <PostSingle
        createComment={createNewComment}
        allowToRespond={true}
        fetchTags={findTagsAPI}
        fetchUsers={findbyUsernameAPI}
        user={user}
        id={post.id}
        html={post.html}
        createdAt={post.createdAt}
        tags={post.tags}
        owner={post.owner}
        firstComments={[]}
        noImage={UserAvatarNoImage}
        activeTags={activeTags}
      />
      {comments && (
        <PostCommentsList postId={post.id} user={user} {...comments} />
      )}
    </div>
  )
}
