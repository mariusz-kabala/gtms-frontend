import { Query } from '@datorama/akita'
import {
  INotificationsSettingsState,
  NotificationsSettingsStore,
  notificationsSettingsStore,
} from './settings.store'

export class NotificationsSettingsQuery extends Query<
  INotificationsSettingsState
> {
  constructor(protected store: NotificationsSettingsStore) {
    super(store)
  }
}

export const notificationsSettingsQuery = new NotificationsSettingsQuery(
  notificationsSettingsStore
)
