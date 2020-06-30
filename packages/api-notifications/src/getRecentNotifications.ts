import { INotification } from '@gtms/commons'
import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IRecentNotificationsResponse {
  docs: INotification[]
  total: number
  limit: number
  offset: number
}

export const fetchRecentNotifications = (offset = 0, limit = 25) =>
  fetchJSON<void, IRecentNotificationsResponse>(
    makeApiUrl(`notifications/recent?offset=${offset}&limit=${limit}`)
  )
