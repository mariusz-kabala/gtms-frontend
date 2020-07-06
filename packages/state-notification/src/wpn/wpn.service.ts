import { wpnStore } from './wpn.store'
import { addErrorNotification } from '@gtms/state-notification'
import {
  subscribeForWebPushNotificationsAPI,
  unsubscribeFromWebPushNotificationsAPI,
} from '@gtms/api-notifications'
import getConfig from 'next/config'
import { urlBase64ToUint8Array } from '@gtms/commons'

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
  const { publicRuntimeConfig } = getConfig()

  navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          publicRuntimeConfig.VAPID_PUBLIC_KEY
        ),
      })
      .then((subscription) => {
        wpnStore.update({
          isEnabled: true,
          isSupported: true,
        })

        return subscribeForWebPushNotifications(
          window.btoa(JSON.stringify(subscription))
        )
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
            unsubscribeFromWebPushNotifications(
              window.btoa(JSON.stringify(subscription))
            )
          )
          .catch(() => {
            addErrorNotification('Error occured, can not disable notifications')
          })
      })
  })
}
