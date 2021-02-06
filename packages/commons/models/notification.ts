import { NotificationType } from '../enums'
import { IGroup } from './group'
import { IUser } from './user'
import { IPost } from './post'
import { IComment } from './comment'

export interface INotification {
  createdAt: string
  id: string
  isRead: boolean
  notificationType: NotificationType
  payload?: any
  relatedRecord: IGroup | IUser | IPost | IComment
  updatedAt: string
}
