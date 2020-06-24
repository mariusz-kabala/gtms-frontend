import { userQuery } from '@gtms/state-user'
import { IAccountDetails } from '@gtms/commons/models'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface IAccountPageState extends IAccountDetails {
  isLoading: boolean
  errorOccured: boolean
}

export const accountPageState = (): IAccountPageState => {
  const values = userQuery.getValue()

  return {
    ...userQuery.accountDetails(),
    isLoading: values.isLoadingDetails,
    errorOccured: values.errorOccured,
  }
}

export const accountPageState$: Observable<IAccountPageState> = userQuery
  .select()
  .pipe(map(() => accountPageState()))
