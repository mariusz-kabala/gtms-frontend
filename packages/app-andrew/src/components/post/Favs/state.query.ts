import { userQuery } from '@gtms/state-user'
import { IAccountDetails } from '@gtms/commons/models'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IFavsState {
  isLogged: boolean
  account: IAccountDetails
}

export const favsState = (): IFavsState => {
  return {
    isLogged: userQuery.isLogged(),
    account: userQuery.accountDetails(),
  }
}

export const favsState$: Observable<IFavsState> = userQuery.accountDetails$.pipe(
  map(() => favsState())
)
