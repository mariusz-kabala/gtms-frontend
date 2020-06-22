import { groupsListQuery } from '@gtms/state-group'
import { usersListQuery } from '@gtms/state-user'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { IGroup, IUser } from '@gtms/commons/models'

export interface ITagPageState {
  groups: {
    isLoading: boolean
    errorOccured: boolean
    offset: number
    limit: number
    docs: IGroup[]
  }
  users: {
    isLoading: boolean
    errorOccured: boolean
    offset: number
    limit: number
    docs: IUser[]
  }
}

export const tagPageState = (): ITagPageState => {
  const groups = groupsListQuery.getValue()
  const users = usersListQuery.getValue()

  return {
    groups: {
      isLoading: groups.loading || false,
      errorOccured: groups.error,
      offset: groups.offset,
      limit: groups.limit,
      docs: groupsListQuery.getAll(),
    },
    users: {
      isLoading: users.loading || false,
      errorOccured: users.error,
      offset: users.offset,
      limit: users.limit,
      docs: usersListQuery.getAll(),
    },
  }
}

export const tagPageState$: Observable<ITagPageState> = combineLatest(
  groupsListQuery.selectAll(),
  usersListQuery.selectAll()
).pipe(map(() => tagPageState()))
