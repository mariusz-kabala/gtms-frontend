import { wpnQuery, notificationsSettingsQuery } from '@gtms/state-notification'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface INotificationsSettingsState {
  isEnabled: boolean
  isSupported: boolean
  isLoading: boolean
  errorOccured: boolean
  invitation: boolean
  newPostInOwnedGroup: boolean
  newMembershipRequestInOwnedGroup: boolean
  newMemberInOwnedGroup: boolean
  newPostInAdminnedGroup: boolean
  newMembershipRequestInAdminnedGroup: boolean
  newMemberInAdminnedGroup: boolean
}

export const notificationsSettingsState = (): INotificationsSettingsState => {
  return {
    ...wpnQuery.getValue(),
    ...notificationsSettingsQuery.getValue(),
  }
}

export const notificationsSettingsState$: Observable<INotificationsSettingsState> = combineLatest(
  [wpnQuery.select(), notificationsSettingsQuery.select()]
).pipe(map(() => notificationsSettingsState()))
