import { InternalNotificationTypes } from '@gtms/state-notification'

export const NotificationIcons = Object.freeze({
  [InternalNotificationTypes.success]: {
    jpg: '/images/icons/iconCelebrate.png',
  },
  [InternalNotificationTypes.error]: {
    jpg: '/images/icons/iconExclamationMark.png',
  },
  [InternalNotificationTypes.question]: {
    jpg: '/images/icons/iconQuestionMark.png',
  },
})
