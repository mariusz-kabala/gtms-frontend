import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface INotificationsSettingsResponse {
  invitation: boolean
  newPostInOwnedGroup: boolean
  newMembershipRequestInOwnedGroup: boolean
  newMemberInOwnedGroup: boolean
  newPostInAdminnedGroup: boolean
  newMembershipRequestInAdminnedGroup: boolean
  newMemberInAdminnedGroup: boolean
}

export const fetchNotificationsSettings = () => {
  return fetchJSON<null, INotificationsSettingsResponse>(
    makeApiUrl('notifications/settings')
  )
}
