import { EntityState, EntityStore } from '@datorama/akita'
import { INotification } from './notifications.model'

export type NotificationsState = EntityState<INotification, number>

export class NotificationsStore extends EntityStore<NotificationsState> {
  constructor() {
    super(undefined, {
      name: 'notifications',
    })
  }
}

export const notificationsStore = new NotificationsStore()
