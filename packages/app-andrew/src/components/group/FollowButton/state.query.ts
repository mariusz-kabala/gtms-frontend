import { notificationsSettingsQuery } from '@gtms/state-notification'
import { userQuery } from '@gtms/state-user'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IFollowButtonState {
  isFollowing: boolean
  errorOccurred: boolean
  isLogged: boolean
}

export const followButtonState = (groupId: string): IFollowButtonState => {
  return {
    isFollowing: notificationsSettingsQuery.isFollowingGroup(groupId),
    errorOccurred: notificationsSettingsQuery.getValue().errorOccured,
    isLogged: userQuery.isLogged(),
  }
}

export const followButtonState$ = (
  userId: string
): Observable<IFollowButtonState> =>
  combineLatest([
    notificationsSettingsQuery.select(),
    userQuery.isLogged$,
  ]).pipe(map(() => followButtonState(userId)))
