import { NotificationTypes } from '@gtms/state-notification'

export const NotificationIcons = Object.freeze({
  [NotificationTypes.success]: { jpg: '/images/icons/iconCelebrate.png' },
  [NotificationTypes.error]: { jpg: '/images/icons/iconExclamationMark.png' },
  [NotificationTypes.question]: { jpg: '/images/icons/iconQuestionMark.png' },
})
