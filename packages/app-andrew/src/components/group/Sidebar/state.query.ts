import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  IGroupPageState,
  groupPageState,
  groupPageState$,
} from 'queries/groupPage.query'
import { uiQuery } from 'state'

export interface IGroupSidebarState extends IGroupPageState {
  isOpen: boolean
}

export const groupSidebarState = (): IGroupSidebarState => {
  const groupState = groupPageState()

  return {
    ...groupState,
    isOpen: groupState.group?.id
      ? uiQuery.isGroupSidebarOpen(groupState.group.id)
      : false,
  }
}

export const groupSidebarState$: Observable<IGroupSidebarState> = combineLatest(
  groupPageState$,
  uiQuery.select()
).pipe(map(() => groupSidebarState()))
