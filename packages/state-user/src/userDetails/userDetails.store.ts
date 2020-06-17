import { Store } from '@datorama/akita'
import { IUserDetailsState } from './userDetails.model'

export type IUserDetailsStore = IUserDetailsState & {
  isLoading: boolean
  errorOccured: boolean
}

export class UserDetailsStore extends Store<IUserDetailsStore> {
  constructor() {
    super(
      {},
      {
        resettable: true,
        name: 'userDetails',
      }
    )
  }
}

export const userDetailsStore = new UserDetailsStore()
