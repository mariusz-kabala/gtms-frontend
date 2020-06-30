import { INotification } from '@gtms/commons/models'

export enum InternalNotificationTypes {
  success,
  error,
  question,
}

export interface IInternalNotification {
  type: InternalNotificationTypes
  text: string
  createdAt: number
  expiresAt: number
  left: number
  id: number
  isRead: boolean
}

export interface INotificationRecord {
  id: number | string
  type: 'internal' | 'api'
  data: INotification | IInternalNotification
}
