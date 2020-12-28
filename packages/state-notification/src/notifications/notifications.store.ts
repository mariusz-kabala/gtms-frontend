import { EntityState, EntityStore } from '@datorama/akita'
import { INotificationRecord } from './notifications.model'

export interface NotificationsState
  extends EntityState<INotificationRecord, number | string> {
  offset: number
  total: number
}

export class NotificationsStore extends EntityStore<NotificationsState> {
  constructor() {
    super(undefined, {
      name: 'notifications',
    })
  }
}

export const notificationsStore = new NotificationsStore()
