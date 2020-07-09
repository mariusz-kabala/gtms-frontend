import { deleteRequest, makeApiUrl } from '@gtms/api-common'

export interface IUnfollowPayload {
  user?: string
  group?: string
}

export const unfollowAPI = (payload: IUnfollowPayload) =>
  deleteRequest(
    makeApiUrl(
      `notifications/follow?user=${payload.user}&group=${payload.group}`
    )
  )
