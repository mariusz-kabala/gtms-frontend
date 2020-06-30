import { EntityState, EntityStore } from '@datorama/akita'
import { INotificationRecord } from './notifications.model'

export type NotificationsState = EntityState<
  INotificationRecord,
  number | string
>

export class NotificationsStore extends EntityStore<NotificationsState> {
  constructor() {
    super(undefined, {
      name: 'notifications',
    })
  }
}

export const notificationsStore = new NotificationsStore()
