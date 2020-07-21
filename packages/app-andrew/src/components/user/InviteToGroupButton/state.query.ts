import { IGroup } from '@gtms/commons/models'
import { myGroupsQuery } from '@gtms/state-user'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IInviteToGroupButtonState {
  isLoading: boolean
  isLoaded: boolean
  errorOccured: boolean
  admin: IGroup[]
  owner: IGroup[]
  member: IGroup[]
  favs: {
    docs: IGroup[]
    limit: number
    offset: number
    total: number
  }
}

export const inviteToGroupButtonState = (): IInviteToGroupButtonState => {
  const status = myGroupsQuery.status()

  return {
    ...myGroupsQuery.groups(),
    isLoading: status.isLoading,
    isLoaded: status.isLoaded,
    errorOccured: status.errorOccurred,
  }
}

export const inviteToGroupButtonState$: Observable<IInviteToGroupButtonState> = myGroupsQuery
  .select()
  .pipe(map(() => inviteToGroupButtonState()))
