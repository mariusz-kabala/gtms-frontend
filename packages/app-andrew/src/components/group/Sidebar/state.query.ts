import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { groupQuery, IGroupState } from '@gtms/state-group'
import { uiQuery } from '@app/state'
import { FileStatus } from '@gtms/commons'

export interface IGroupSidebarContentState extends IGroupState {
  avatarFileStatus: FileStatus
  hasAdminRights: boolean
  showPromoted: boolean
  showUsers: boolean
}

export const groupSidebarContentState = (): IGroupSidebarContentState => {
  const group = groupQuery.getValue()

  return {
    ...group,
    ...(group.group?.id
      ? uiQuery.groupState(group.group.id)
      : {
          showPromoted: false,
          showUsers: false,
        }),
    hasAdminRights: groupQuery.hasAdminRights(),
    avatarFileStatus: groupQuery.getAvatarFileStatus(),
  }
}

export const groupSidebarContentState$: Observable<IGroupSidebarContentState> = combineLatest(
  [groupQuery.allState$, uiQuery.select()]
).pipe(map(() => groupSidebarContentState()))
