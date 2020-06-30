import React, { FC } from 'react'
import { IPost, IUser, IGroup } from '@gtms/commons/models'
import { getDisplayName, getImage } from '@gtms/commons/helpers'
import { Picture } from '../Picture'

export const NotificationNewPost: FC<{
  post: IPost
  postOwner: IUser
  group: IGroup
}> = ({ group, postOwner, post }) => {
  return (
    <li data-testid={'notification-new-post'}>
      <Picture {...getImage('200x200', group.avatar)} />
      <h2>New post in {group.name}</h2>
      <Picture {...getImage('50x50', postOwner.avatar)} />
      <h3>{getDisplayName(postOwner)}</h3>
      <p>{post.text}</p>
    </li>
  )
}
