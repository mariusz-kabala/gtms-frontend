import { QueryEntity, toBoolean } from '@datorama/akita'
import {
  NotificationsState,
  NotificationsStore,
  notificationsStore,
} from './notifications.store'

export class NotificationsQuery extends QueryEntity<NotificationsState> {
  constructor(protected store: NotificationsStore) {
    super(store)
  }

  public hasUnread = () =>
    toBoolean(
      this.getAll({
        filterBy: (entry) => entry.isRead === false,
      }).length > 0
    )

  public hasUnread$ = this.select(() => this.hasUnread())

  public unread = () =>
    this.getAll({
      filterBy: (entry) => entry.isRead === false,
    })

  public unread$ = this.selectAll({
    filterBy: (entry) => entry.isRead === false,
  })
}

export const notificationsQuery = new NotificationsQuery(notificationsStore)
