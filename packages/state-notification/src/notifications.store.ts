import { EntityState, EntityStore } from '@datorama/akita'
import { INotificationLabel } from './notifications.model'

export type NotificationsState = EntityState<INotificationLabel, number>

export class NotificationsStore extends EntityStore<NotificationsState> {
  constructor() {
    super(undefined, {
      name: 'notifications',
    })
  }
}

export const notificationsStore = new NotificationsStore()
