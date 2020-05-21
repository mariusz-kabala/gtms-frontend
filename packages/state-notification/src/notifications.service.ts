import { INotification, NotificationTypes } from './notifications.model'
import { notificationsStore } from './notifications.store'
import { notificationsQuery } from './notifications.query'

let timer: any

function startTimerIfNeeded() {}

export const addNotification = (notification: Partial<INotification>) => {
  const last = notificationsQuery.getCount()
    ? notificationsQuery.getAll().splice(-1).pop()
    : undefined
  const id = last ? last.id : 1
  const now = new Date().getTime()

  console.log({
    ...notification,
    id,
    createdAt: now,
    isRead: false,
  })

  notificationsStore.add({
    ...notification,
    id,
    createdAt: now,
    isRead: false,
  } as INotification)

  console.log(notificationsStore.getValue())

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
