import React, { FC } from 'react'
import { INotification } from '@gtms/commons/models'
import { NotificationType } from '@gtms/commons/enums'
import { NotificationNewPost } from '@gtms/ui/NotificationNewPost'
import { NotificationNewMember } from '@gtms/ui/NotificationNewMember'
import { IPost, IUser, IGroup } from '@gtms/commons/models'

export const NotificationAPI: FC<INotification> = ({
  notificationType,
  payload,
  relatedRecord,
}) => {
  switch (notificationType) {
    case NotificationType.newPost:
      return (
        <NotificationNewPost
          post={relatedRecord as IPost}
          postOwner={payload.postOwner as IUser}
          group={payload.group as IGroup}
        />
      )
    case NotificationType.newGroupMember:
      return <NotificationNewMember group={payload.group as IGroup} />
  }

  return <div>{notificationType} is not yet supported; fix this!</div>
}
