export enum NotificationTypes {
  success,
  error,
  question,
}

export interface INotification {
  type: NotificationTypes
  text: string
  createdAt: number
  id: number
  isRead: boolean
}
