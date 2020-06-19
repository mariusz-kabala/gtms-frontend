import { wpnQuery } from '@gtms/state-notification'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface INotificationsSettingsState {
  isEnabled: boolean
  isSupported: boolean
}

export const notificationsSettingsState = (): INotificationsSettingsState => {
  return wpnQuery.getValue()
}

export const notificationsSettingsState$: Observable<INotificationsSettingsState> = combineLatest(
  wpnQuery.select()
).pipe(map(() => notificationsSettingsState()))
