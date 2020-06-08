import { userDetailsQuery } from '@gtms/state-user'
import { IUser, IGroup } from '@gtms/commons'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IUserPageState extends IUser {
  isLoading: boolean
  notFound: boolean
  errorOccured: boolean
  groupsMember: IGroup[]
  groupsAdmin: IGroup[]
  groupsOwner: IGroup[]
}

export const userPageState = (): IUserPageState => {
  return {
    ...userDetailsQuery.getValue(),
    notFound: false,
  }
}

export const userPageState$: Observable<IUserPageState> = combineLatest(
  userDetailsQuery.select()
).pipe(map(() => userPageState()))
