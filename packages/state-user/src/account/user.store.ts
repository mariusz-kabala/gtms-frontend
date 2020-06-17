import { Store } from '@datorama/akita'
import { IUserState } from './user.model'

export type IUserStore = IUserState & {
  isInitialized: boolean
  isLoadingDetails: boolean
  errorOccured: boolean
}

export class UserStore extends Store<IUserStore> {
  constructor() {
    super(
      {
        isInitialized: false,
        isLoadingDetails: false,
        errorOccured: false,
      },
      {
        resettable: true,
        name: 'user',
      }
    )
  }
}

export const userStore = new UserStore()
