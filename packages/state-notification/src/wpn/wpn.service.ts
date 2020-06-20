import { wpnStore } from './wpn.store'
import { addErrorNotification } from '@gtms/state-notification'
import {
  subscribeForWebPushNotificationsAPI,
  unsubscribeFromWebPushNotificationsAPI,
} from '@gtms/api-notifications'

async function subscribeForWebPushNotifications(subscription: string) {
  return subscribeForWebPushNotificationsAPI({
    subscription,
    userAgent: navigator.userAgent,
  })
}

async function unsubscribeFromWebPushNotifications(subscription: string) {
  return unsubscribeFromWebPushNotificationsAPI({
    subscription,
  })
}

export function init() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return
  }

  navigator.serviceWorker.register('/sw.js').then(() => {
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
      return // notifications are not supported
    }

    if (Notification.permission === 'denied') {
      return // the user has blocked notifications
    }

    if (!('PushManager' in window)) {
      return // push messaging is not supported
    }

    navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
      serviceWorkerRegistration.pushManager
        .getSubscription()
        .then((subscription) => {
          wpnStore.update({
            isEnabled: !!subscription,
            isSupported: true,
          })
        })
    })
  })
}

export function subscribe() {
  navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager
      .subscribe({ userVisibleOnly: true })
      .then((subscription) => {
        wpnStore.update({
          isEnabled: true,
          isSupported: true,
        })

        return subscribeForWebPushNotifications(subscription.endpoint)
      })
      .catch(() => {
        addErrorNotification('Error occured, can not enable notifications')
      })
  })
}

export function unsubscribe() {
  wpnStore.update({
    isEnabled: false,
    isSupported: true,
  })
  navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
    serviceWorkerRegistration.pushManager
      .getSubscription()
      .then((pushSubscription) => {
        if (!pushSubscription) {
          return // no subscription, nothing to do
        }

        pushSubscription
          .unsubscribe()
          .then(() =>
            unsubscribeFromWebPushNotifications(pushSubscription.endpoint)
          )
          .catch(() => {
            addErrorNotification('Error occured, can not disable notifications')
          })
      })
  })
}
