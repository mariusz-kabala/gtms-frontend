import React, { FC } from 'react'
import { IPost, IAccountDetails, IComment } from '@gtms/commons/models'
import { PostSingle } from '@gtms/ui/PostSingle'
import { findTagsAPI } from '@gtms/api-tags'
import { UserAvatarNoImage } from 'enums'
import { createNewComment } from '@gtms/state-post'
import { PostCommentsList } from '../../comments/PostCommentsList'

export const PostDetails: FC<{
  post: IPost
  user: IAccountDetails | null
  comments?: {
    isLoading: boolean
    errorOccured: boolean
    total: number
    offset: number
    limit: number
    comments: IComment[]
  }
}> = ({ post, user, comments }) => {
  return (
    <div>
      <PostSingle
        key={`post-${post.id}`}
        createComment={createNewComment}
        fetchTags={findTagsAPI}
        user={user}
        id={post.id}
        text={post.text}
        createdAt={post.createdAt}
        tags={post.tags}
        owner={post.owner}
        firstComments={[]}
        noImage={UserAvatarNoImage}
      />
      {comments && <PostCommentsList user={user} {...comments} />}
    </div>
  )
}
