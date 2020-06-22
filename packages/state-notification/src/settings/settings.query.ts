import { Query } from '@datorama/akita'
import {
  INotificationsSettingsState,
  NotificationsSettingsStore,
  notificationsSettingsStore,
} from './settings.store'

export class NotificationsSettingsQuery extends Query<
  INotificationsSettingsState
> {
  public isFollowingUser = (user: string, values = this.getValue()) => {
    if (!values.isLoaded) {
      return false
    }

    return values.users.includes(user)
  }

  public isFollowingGroup = (group: string, values = this.getValue()) => {
    if (!values.isLoaded) {
      return false
    }

    return values.groups.includes(group)
  }

  constructor(protected store: NotificationsSettingsStore) {
    super(store)
  }
}

export const notificationsSettingsQuery = new NotificationsSettingsQuery(
  notificationsSettingsStore
)
