import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface ISubscriptionPayload {
  subscription: string
  userAgent: string
}

export const subscribeForWebPushNotificationsAPI = (
  payload: ISubscriptionPayload
) => {
  return fetchJSON<ISubscriptionPayload, null>(
    makeApiUrl('notifications/web-push'),
    {
      values: payload,
    }
  )
}
