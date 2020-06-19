'use strict'

self.addEventListener('push', function (event) {
  // this will be adjusted later, just an example for now
  const title = 'Yay a message.'
  const body = 'We have received a push message.'
  const icon = '/images/icon-192x192.png'
  const tag = 'simple-push-demo-notification-tag'

  event.waitUntil(
    self.registration.showNotification(title, {
      body: body,
      icon: icon,
      tag: tag,
    })
  )
})

self.addEventListener('notificationclick', function (event) {
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146
  event.notification.close()

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i]
          if (client.url === '/' && 'focus' in client) {
            return client.focus()
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/')
        }
      })
  )
})
