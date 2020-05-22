import { INotification, NotificationTypes } from './notifications.model'
import { notificationsStore } from './notifications.store'
import { notificationsQuery } from './notifications.query'

let timer: any

function startTimerIfNeeded() {
  if (typeof timer !== 'undefined') {
    return
  }

  timer = setInterval(() => {
    let foundUnread = false
    const now = new Date().getTime()

    notificationsQuery.getAll().forEach((n) => {
      const timeout = n.expiresAt - n.createdAt
      const current = n.expiresAt - now
      const left = (current * 100) / timeout
      let update: Partial<INotification>

      if (left > 0 && n.isRead === false) {
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

      notificationsStore.upsert(n.id, update)
    })

    if (foundUnread === false) {
      clearInterval(timer)
      timer = undefined
    }
  }, 100)
}

export const addNotification = (notification: Partial<INotification>) => {
  const last =
    notificationsQuery.getCount() > 0
      ? notificationsQuery.getAll().splice(-1).pop()
      : undefined
  const id = last ? last.id + 1 : 1
  const now = new Date().getTime()

  notificationsStore.add({
    ...notification,
    id,
    createdAt: now,
    expiresAt: now + 15000, // 15s
    left: 100,
    isRead: false,
  } as INotification)

  startTimerIfNeeded()
}

export const addSuccessNotification = (text: string) => {
  addNotification({
    text,
    type: NotificationTypes.success,
  })
}

export const addErrorNotification = (text: string) => {
  addNotification({
    text,
    type: NotificationTypes.error,
  })
}

export const markAsRead = (id: number) => {
  notificationsStore.upsert(id, {
    left: -1,
    isRead: true,
  })
}

export const deleteNotification = (id: number) => {
  notificationsStore.remove(id)
}
