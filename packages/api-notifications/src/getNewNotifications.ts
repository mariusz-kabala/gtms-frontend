import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { INotification } from '@gtms/commons'

export const fetchNewNotifications = () =>
  fetchJSON<void, INotification[]>(makeApiUrl('notifications'))
