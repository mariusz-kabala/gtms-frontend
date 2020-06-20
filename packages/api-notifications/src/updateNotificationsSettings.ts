import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface INotificationsSettingsPayload {
  invitation?: boolean
  newPostInOwnedGroup?: boolean
  newMembershipRequestInOwnedGroup?: boolean
  newMemberInOwnedGroup?: boolean
  newPostInAdminnedGroup?: boolean
  newMembershipRequestInAdminnedGroup?: boolean
  newMemberInAdminnedGroup?: boolean
}

export const updateNotificationsSettingsAPI = (
  payload: INotificationsSettingsPayload
) => {
  return fetchJSON<INotificationsSettingsPayload, null>(
    makeApiUrl('notifications/settings'),
    {
      values: payload,
    }
  )
}
