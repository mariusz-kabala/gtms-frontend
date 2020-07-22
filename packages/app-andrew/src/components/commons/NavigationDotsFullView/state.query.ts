import { myGroupsQuery, IMyGroups } from '@gtms/state-user'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface INavigationDotsFullViewState extends IMyGroups {
  isLoading: boolean
  errorOccurred: boolean
  isLoaded: boolean
}

export const navigationDotsFullViewState = (): INavigationDotsFullViewState => {
  return {
    ...myGroupsQuery.groups(),
    ...myGroupsQuery.status(),
  }
}

export const navigationDotsFullViewState$: Observable<INavigationDotsFullViewState> = myGroupsQuery
  .select()
  .pipe(map(() => navigationDotsFullViewState()))
