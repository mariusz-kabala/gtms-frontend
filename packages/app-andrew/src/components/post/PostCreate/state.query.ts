import { IAccountDetails } from '@gtms/commons/models'
import { userQuery } from '@gtms/state-user'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

export interface IPostCreateState {
  user: IAccountDetails | null
}

export const postCreateState = (): IPostCreateState => {
  return {
    user: userQuery.isLogged() ? userQuery.accountDetails() : null,
  }
}

export const postCreateState$: Observable<IPostCreateState> = userQuery
  .select()
  .pipe(map(() => postCreateState()))
