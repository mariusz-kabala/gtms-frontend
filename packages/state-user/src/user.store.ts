import { Store } from '@datorama/akita'
import { IUserState } from './user.model'

export type IUserStore = IUserState & { isInitialized: boolean }

export class UserStore extends Store<IUserStore> {
  constructor() {
    super(
      {
        isInitialized: false,
      },
      {
        resettable: true,
        name: 'user',
      }
    )
  }
}

export const userStore = new UserStore()
