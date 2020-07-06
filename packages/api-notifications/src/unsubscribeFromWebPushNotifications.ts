import { deleteRequest, makeApiUrl } from '@gtms/api-common'

export interface IUnsubscribePayload {
  subscription: string
}

export const unsubscribeFromWebPushNotificationsAPI = (
  payload: IUnsubscribePayload
) => {
  return deleteRequest(
    makeApiUrl(`notifications/web-push/${payload.subscription}`)
  )
}
