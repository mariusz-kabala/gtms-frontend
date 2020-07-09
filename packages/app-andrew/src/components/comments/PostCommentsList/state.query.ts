import { userQuery } from '@gtms/state-user'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IPostCommentsListState {
  isLogged: boolean
}

export const postCommentsListState = (): IPostCommentsListState => {
  return {
    isLogged: userQuery.isLogged(),
  }
}

export const postCommentsListState$: Observable<IPostCommentsListState> = userQuery.isLogged$.pipe(
  map(() => postCommentsListState())
)
