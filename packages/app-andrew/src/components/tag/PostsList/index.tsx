import React, { FC } from 'react'
import { Spinner } from '@gtms/ui/Spinner'
import { PostSingle } from '@gtms/ui/PostSingle'
import { IPost, IAccountDetails } from '@gtms/commons/models'
import { findTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
import { UserAvatarNoImage } from 'enums'
import { openLoginModal } from 'state'

export const PostsList: FC<{
  records: IPost[]
  isLoading: boolean
  user: IAccountDetails | null
}> = ({ records, isLoading, user }) => {
  return (
    <div data-testid="posts-list">
      {isLoading && <Spinner />}
      {!isLoading &&
        records.length > 0 &&
        records.map((post) => (
          <PostSingle
            key={`post-${post.id}`}
            fetchTags={findTagsAPI}
            fetchUsers={findbyUsernameAPI}
            createComment={() => null}
            user={user}
            {...post}
            noImage={UserAvatarNoImage}
            onLoginRequest={openLoginModal}
          />
        ))}
      {!isLoading && records.length === 0 && <p>No posts found</p>}
    </div>
  )
}
