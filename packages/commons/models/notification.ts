import { NotificationType } from '../enums'
import { IGroup } from './group'
import { IUser } from './user'
import { IPost } from './post'
import { IComment } from './comment'

export interface INotification {
  id: string
  notificationType: NotificationType
  relatedRecord: IGroup | IUser | IPost | IComment
  isRead: boolean
  payload?: any
  createdAt: string
  updatedAt: string
}
