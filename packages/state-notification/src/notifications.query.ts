import { QueryEntity } from '@datorama/akita'
import {
  NotificationsState,
  NotificationsStore,
  notificationsStore,
} from './notifications.store'

export class NotificationsQuery extends QueryEntity<NotificationsState> {
  constructor(protected store: NotificationsStore) {
    super(store)
  }
}

export const notificationsQuery = new NotificationsQuery(notificationsStore)
