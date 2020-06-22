import {
  updateNotificationsSettingsAPI,
  INotificationsSettingsPayload,
  fetchGNotificationsSettings,
  followAPI,
  unfollowAPI,
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

export async function loadNotificationsSettings(force = false) {
  if (!force && notificationsSettingsStore.getValue().isLoaded) {
    return
  }

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

export async function followGroup(groupId: string) {
  try {
    await followAPI({
      group: groupId,
    })

    const followedGroups = notificationsSettingsStore.getValue().groups

    if (!followedGroups.includes(groupId)) {
      followedGroups.push(groupId)

      notificationsSettingsStore.update({
        groups: [...followedGroups],
      })
    }
  } catch {
    addErrorNotification('Can not subscribe for notifications, try later')
  }
}

export async function unfollowGroup(groupId: string) {
  try {
    await unfollowAPI({
      group: groupId,
    })

    const followedGroups = notificationsSettingsStore.getValue().groups
    const index = followedGroups.indexOf(groupId)

    if (index > -1) {
      followedGroups.splice(index, 1)

      notificationsSettingsStore.update({
        groups: [...followedGroups],
      })
    }
  } catch {
    addErrorNotification('Can not unsubscribe for notifications, try later')
  }
}

export async function followUser(userId: string) {
  try {
    await followAPI({
      user: userId,
    })

    const followedUsers = notificationsSettingsStore.getValue().users

    if (!followedUsers.includes(userId)) {
      followedUsers.push(userId)

      notificationsSettingsStore.update({
        users: [...followedUsers],
      })
    }
  } catch {
    addErrorNotification('Can not subscribe for notifications, try later')
  }
}

export async function unfollowUser(userId: string) {
  try {
    await unfollowAPI({
      user: userId,
    })

    const followedUsers = notificationsSettingsStore.getValue().users
    const index = followedUsers.indexOf(userId)

    if (index > -1) {
      followedUsers.splice(index, 1)

      notificationsSettingsStore.update({
        users: [...followedUsers],
      })
    }
  } catch {
    addErrorNotification('Can not unsubscribe for notifications, try later')
  }
}
