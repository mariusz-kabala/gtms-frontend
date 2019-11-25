import { Store, StoreConfig } from '@datorama/akita'
import { IUser } from './user.model'

export type IUserStore = IUser & { isInitialized: boolean }

@StoreConfig({ name: 'user' })
export class UserStore extends Store<IUserStore> {
  constructor() {
    super({
      isInitialized: false,
    })
  }
}

export const userStore = new UserStore()
