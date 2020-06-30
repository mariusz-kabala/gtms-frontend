import { QueryEntity, Order, toBoolean } from '@datorama/akita'
import {
  NotificationsState,
  NotificationsStore,
  notificationsStore,
} from './notifications.store'

export class NotificationsQuery extends QueryEntity<NotificationsState> {
  constructor(protected store: NotificationsStore) {
    super(store, {
      sortBy: 'id',
      sortByOrder: Order.DESC,
    })
  }

  public hasUnread = () =>
    toBoolean(
      this.getAll({
        filterBy: (entry) => entry.data.isRead === false,
      }).length > 0
    )

  public hasUnread$ = this.select(() => this.hasUnread())

  public hasInternalUnread = () =>
    toBoolean(
      this.getAll({
        filterBy: (entry) =>
          entry.type === 'internal' && entry.data.isRead === false,
      }).length > 0
    )

  public hasInternalUnread$ = this.select(() => this.hasInternalUnread())

  public unread = () =>
    this.getAll({
      filterBy: (entry) => entry.data.isRead === false,
    })

  public unread$ = this.selectAll({
    filterBy: (entry) => entry.data.isRead === false,
  })

  public internalUnread = () =>
    this.getAll({
      filterBy: (entry) =>
        entry.type === 'internal' && entry.data.isRead === false,
    })

  public internalUnread$ = this.selectAll({
    filterBy: (entry) =>
      entry.type === 'internal' && entry.data.isRead === false,
  })
}

export const notificationsQuery = new NotificationsQuery(notificationsStore)
