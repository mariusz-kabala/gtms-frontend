import {
  updateNotificationsSettingsAPI,
  INotificationsSettingsPayload,
  fetchGNotificationsSettings,
} from '@gtms/api-notifications'
import { notificationsSettingsStore } from './settings.store'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'

export function updateNotificationsSettings(
  update: INotificationsSettingsPayload
) {
  notificationsSettingsStore.update(update)
}

export async function saveNotificationsSettings() {
  const storeValues = notificationsSettingsStore.getValue()
  const payload: INotificationsSettingsPayload = {
    invitation: storeValues.invitation,
    newPostInOwnedGroup: storeValues.newPostInOwnedGroup,
    newMembershipRequestInOwnedGroup:
      storeValues.newMembershipRequestInOwnedGroup,
    newMemberInOwnedGroup: storeValues.newMemberInOwnedGroup,
    newPostInAdminnedGroup: storeValues.newPostInAdminnedGroup,
    newMembershipRequestInAdminnedGroup:
      storeValues.newMembershipRequestInAdminnedGroup,
    newMemberInAdminnedGroup: storeValues.newMemberInAdminnedGroup,
  }

  try {
    await updateNotificationsSettingsAPI(payload)
    addSuccessNotification('Notifications have been updated')
  } catch {
    addErrorNotification('Can not update notifications settings, try later')
  }
}

export async function loadNotificationsSettings() {
  notificationsSettingsStore.update({
    isLoading: true,
    errorOccured: false,
    isLoaded: false,
  })

  try {
    const settings = await fetchGNotificationsSettings()

    notificationsSettingsStore.update({
      isLoading: false,
      errorOccured: false,
      isLoaded: true,
      ...settings,
    })
  } catch {
    notificationsSettingsStore.update({
      isLoading: false,
      errorOccured: true,
      isLoaded: false,
    })
  }
}
