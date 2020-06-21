import { notificationsSettingsQuery } from '@gtms/state-notification'
import { userQuery } from '@gtms/state-user'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IFollowButtonState {
  userId?: string
  isFollowing: boolean
  errorOccurred: boolean
  isLogged: boolean
}

export const followButtonState = (userId: string): IFollowButtonState => {
  return {
    userId: userQuery.id(),
    isFollowing: notificationsSettingsQuery.isFollowingUser(userId),
    errorOccurred: notificationsSettingsQuery.getValue().errorOccured,
    isLogged: userQuery.isLogged(),
  }
}

export const followButtonState$ = (
  groupId: string
): Observable<IFollowButtonState> =>
  combineLatest(notificationsSettingsQuery.select(), userQuery.isLogged$).pipe(
    map(() => followButtonState(groupId))
  )
