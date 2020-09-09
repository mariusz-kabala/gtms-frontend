import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { groupQuery, groupMembersQuery } from '@gtms/state-group'
import { postsQuery } from '@gtms/state-post'
import { IGroup, IUser } from '@gtms/commons/models'

export interface IGroupSidebarContentState {
  group: IGroup | null
  activeTags?: string[]
  activeUsers?: string[]
  members: {
    isLoading: boolean
    errorOccured: boolean
    users: IUser[]
  }
}

export const groupSidebarContentState = (): IGroupSidebarContentState => {
  const groupMembersState = groupMembersQuery.getValue()
  const postsState = postsQuery.getValue()

  return {
    ...groupQuery.getValue(),
    activeTags: postsState.tags || [],
    activeUsers: postsState.users || [],
    members: {
      isLoading: groupMembersState.loading || false,
      errorOccured: groupMembersState.error || false,
      users: groupMembersQuery.getAll(),
    },
  }
}

export const groupSidebarContentState$: Observable<IGroupSidebarContentState> = combineLatest(
  groupQuery.allState$,
  postsQuery.selectAll(),
  groupMembersQuery.selectAll()
).pipe(map(() => groupSidebarContentState()))
