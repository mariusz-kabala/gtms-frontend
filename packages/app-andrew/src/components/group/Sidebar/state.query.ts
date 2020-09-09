import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { groupQuery } from '@gtms/state-group'
import { IGroup } from '@gtms/commons/models'
import { uiQuery } from 'state'

export interface IGroupSidebarState {
  isOpen: boolean
  group: IGroup | null
}

export const groupSidebarState = (): IGroupSidebarState => {
  const groupState = groupQuery.getValue()

  return {
    ...groupState,
    isOpen: groupState.group?.id
      ? uiQuery.isGroupSidebarOpen(groupState.group.id)
      : false,
  }
}

export const groupSidebarState$: Observable<IGroupSidebarState> = combineLatest(
  groupQuery.allState$,
  uiQuery.select()
).pipe(map(() => groupSidebarState()))
