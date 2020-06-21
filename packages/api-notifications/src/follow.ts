import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IFollowPayload {
  user?: string
  group?: string
}

export const followAPI = (payload: IFollowPayload) =>
  fetchJSON<IFollowPayload, null>(makeApiUrl('notifications/follow'), {
    values: payload,
  })
