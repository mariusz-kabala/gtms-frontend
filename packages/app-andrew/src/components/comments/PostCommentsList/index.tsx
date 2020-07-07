import React, { FC } from 'react'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { PostResponse } from '@gtms/ui/PostSingle/PostResponse'
import { Spinner } from '@gtms/ui/Spinner'
import { IComment, IUser } from '@gtms/commons/models'
import { UserAvatarNoImage } from 'enums'

export const PostCommentsList: FC<{
  isLoading: boolean
  errorOccured: boolean
  total: number
  offset: number
  limit: number
  comments: IComment[]
}> = ({ isLoading, errorOccured, comments }) => {
  if (isLoading) {
    return <Spinner />
  }

  if (errorOccured) {
    return (
      <p>
        We can not show comments to the post right now, please refresh or try
        later
      </p>
    )
  }

  if (!Array.isArray(comments) || comments.length === 0) {
    return <p>No comments, you can add the first one</p>
  }

  return (
    <div>
      {comments.map((comment) => (
        <PostResponse
          key={`comment-${comment.id}`}
          text={comment.text}
          createdAt={comment.createdAt}
          owner={getDisplayName(comment.owner as IUser)}
          image={getImage('35x35', comment.owner.avatar, UserAvatarNoImage)}
        />
        // todo: pagination is missing
      ))}
    </div>
  )
}
