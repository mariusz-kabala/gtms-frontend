import React, { FC } from 'react'
import { IPost, IAccountDetails } from '@gtms/commons/models'
import { PostSingle } from '@gtms/ui/PostSingle'
import { findTagsAPI } from '@gtms/api-tags'
import { UserAvatarNoImage } from 'enums'
import { createNewComment } from '@gtms/state-post'

export const PostDetails: FC<{
  post: IPost
  user: IAccountDetails | null
}> = ({ post, user }) => {
  return (
    <PostSingle
      key={`post-${post.id}`}
      createComment={createNewComment}
      fetchTags={findTagsAPI}
      user={user}
      {...post}
      noImage={UserAvatarNoImage}
    />
  )
}
