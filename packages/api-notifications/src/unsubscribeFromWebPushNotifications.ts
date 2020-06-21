import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IUnsubscribePayload {
  subscription: string
}

export const unsubscribeFromWebPushNotificationsAPI = (
  payload: IUnsubscribePayload
) => {
  return fetchJSON<IUnsubscribePayload, null>(
    makeApiUrl('notifications/web-push'),
    {
      values: payload,
      method: 'DELETE',
    }
  )
}
