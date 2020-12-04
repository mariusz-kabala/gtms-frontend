import { uiQuery } from 'state'
import { groupMembersQuery, groupQuery } from '@gtms/state-group'
import { IUser } from '@gtms/commons/models'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IGroupSettingsPageState {
  members: {
    isLoading: boolean
    errorOccured: boolean
    users: IUser[]
  }
  groupSlug?: string
  showPromoted: boolean
  showUsers: boolean
}

export const groupSettingsPageState = (): IGroupSettingsPageState => {
  const groupMembersState = groupMembersQuery.getValue()
  const group = groupQuery.getValue()

  return {
    members: {
      isLoading: groupMembersState.loading || false,
      errorOccured: groupMembersState.error || false,
      users: groupMembersQuery.getAll(),
    },
    groupSlug: group.group?.slug,
    ...(group.group?.id
      ? uiQuery.groupState(group.group.id)
      : {
          showPromoted: false,
          showUsers: false,
        }),
  }
}

export const groupSettingsPageState$: Observable<IGroupSettingsPageState> = combineLatest(
  groupQuery.allState$,
  groupMembersQuery.selectAll(),
  uiQuery.select()
).pipe(map(() => groupSettingsPageState()))
