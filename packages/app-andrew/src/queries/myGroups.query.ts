import { myGroupsQuery } from '@gtms/state-user'
import { IGroup } from '@gtms/commons'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IMyGroupsPageState {
  isLoading: boolean
  errorOccurred: boolean
  admin: IGroup[]
  member: IGroup[]
  owner: IGroup[]
  favs: {
    docs: IGroup[]
    limit: number
    offset: number
    total: number
  }
}

export const myGroupsPageState = (): IMyGroupsPageState => ({
  ...myGroupsQuery.getValue(),
  ...myGroupsQuery.status(),
})

export const myGroupsPageState$: Observable<IMyGroupsPageState> = combineLatest(
  [myGroupsQuery.groups$, myGroupsQuery.status$]
).pipe(map(() => myGroupsPageState()))
