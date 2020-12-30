import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { userQuery } from '@gtms/state-user'
import { IAccountDetails } from '@gtms/commons/models'

export interface IMyPostsState {
  user: IAccountDetails
}

export const myPostsState = (): IMyPostsState => {
  return {
    user: userQuery.accountDetails(),
  }
}

export const myPostsState$: Observable<IMyPostsState> = userQuery.accountDetails$.pipe(
  map(() => myPostsState())
)
