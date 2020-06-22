import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IUnfollowPayload {
  user?: string
  group?: string
}

export const unfollowAPI = (payload: IUnfollowPayload) =>
  fetchJSON<IUnfollowPayload, null>(makeApiUrl('notifications/follow'), {
    values: payload,
    method: 'DELETE',
  })
