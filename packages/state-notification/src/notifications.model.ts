export enum NotificationTypes {
  success,
  error,
  question,
}

export interface INotificationLabel {
  type: NotificationTypes
  text: string
  createdAt: number
  expiresAt: number
  left: number
  id: number
  isRead: boolean
}
