import { userQuery, myGroupsQuery } from '@gtms/state-user'
import { IAccountDetails, IGroup } from '@gtms/commons/models'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IAccountPageState extends IAccountDetails {
  isLoading: boolean
  errorOccured: boolean
  favsGroupsCounter: number
  ownedGroupsCounter: number
  memberedGroupsCounter: number
  groups: IGroup[]
}

export const accountPageState = (): IAccountPageState => {
  const values = userQuery.getValue()
  const groups = myGroupsQuery.groups()

  return {
    ...userQuery.accountDetails(),
    isLoading: values.isLoadingDetails,
    errorOccured: values.errorOccured,
    favsGroupsCounter: groups.favs ? groups.favs.total : 0,
    ownedGroupsCounter: groups.owner ? groups.owner.length : 0,
    memberedGroupsCounter: groups.member ? groups.member.length : 0,
    groups: [...groups.owner, ...groups.member],
  }
}

export const accountPageState$: Observable<IAccountPageState> = combineLatest([
  userQuery.select(),
  myGroupsQuery.select(),
]).pipe(map(() => accountPageState()))
