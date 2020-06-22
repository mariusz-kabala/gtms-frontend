import { Store } from '@datorama/akita'

export interface INotificationsSettingsState {
  isLoading: boolean
  isLoaded: boolean
  errorOccured: boolean
  invitation: boolean
  newPostInOwnedGroup: boolean
  newMembershipRequestInOwnedGroup: boolean
  newMemberInOwnedGroup: boolean
  newPostInAdminnedGroup: boolean
  newMembershipRequestInAdminnedGroup: boolean
  newMemberInAdminnedGroup: boolean
  users: string[]
  groups: string[]
}

export class NotificationsSettingsStore extends Store<
  INotificationsSettingsState
> {
  constructor() {
    super(
      {
        isLoading: false,
        isLoaded: false,
        errorOccured: false,
        invitation: true,
        newPostInOwnedGroup: false,
        newMembershipRequestInOwnedGroup: false,
        newMemberInOwnedGroup: false,
        newPostInAdminnedGroup: false,
        newMembershipRequestInAdminnedGroup: false,
        newMemberInAdminnedGroup: false,
        users: [],
        groups: [],
      },
      {
        name: 'notificationsSettings',
      }
    )
  }
}

export const notificationsSettingsStore = new NotificationsSettingsStore()
