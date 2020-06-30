import {
  INotificationRecord,
  InternalNotificationTypes,
  IInternalNotification,
} from './notifications.model'
import { notificationsStore } from './notifications.store'
import { notificationsQuery } from './notifications.query'

let timer: any

const filterInternal = {
  filterBy: (n: INotificationRecord) => n.type === 'internal',
}

function startTimerIfNeeded() {
  if (typeof timer !== 'undefined') {
    return
  }

  timer = setInterval(() => {
    let foundUnread = false
    const now = new Date().getTime()

    notificationsQuery
      .getAll(filterInternal)
      .forEach((n: INotificationRecord) => {
        const timeout =
          (n.data as IInternalNotification).expiresAt -
          (n.data as IInternalNotification).createdAt
        const current = (n.data as IInternalNotification).expiresAt - now
        const left = (current * 100) / timeout
        let update: Partial<IInternalNotification>

        if (left > 0 && (n.data as IInternalNotification).isRead === false) {
          foundUnread = true
          update = {
            left,
          }
        } else {
          update = {
            left: -1,
            isRead: true,
          }
        }

        notificationsStore.upsert(n.id, {
          ...n,
          data: {
            ...n.data,
            ...update,
          } as IInternalNotification,
        })
      })

    if (foundUnread === false) {
      clearInterval(timer)
      timer = undefined
    }
  }, 100)
}

export const addNotification = (
  notification: Partial<IInternalNotification>
) => {
  const last =
    notificationsQuery.getCount() > 0
      ? notificationsQuery.getAll(filterInternal).splice(-1).pop()
      : undefined
  const id = last ? (last.id as number) + 1 : 1
  const now = new Date().getTime()

  notificationsStore.add({
    id,
    type: 'internal',
    data: {
      ...notification,
      createdAt: now,
      expiresAt: now + 15000, // 15s
      left: 100,
      isRead: false,
    },
  } as INotificationRecord)

  startTimerIfNeeded()
}

export const addSuccessNotification = (text: string) => {
  addNotification({
    text,
    type: InternalNotificationTypes.success,
  })
}

export const addErrorNotification = (text: string) => {
  addNotification({
    text,
    type: InternalNotificationTypes.error,
  })
}

export const markAsRead = (id: number | string) => {
  const notification = notificationsQuery.getEntity(id)

  notificationsStore.upsert(id, {
    ...notification,
    data: {
      ...notification.data,
      left: -1,
      isRead: true,
    },
  })
}

export const deleteNotification = (id: number | string) => {
  notificationsStore.remove(id)
}
