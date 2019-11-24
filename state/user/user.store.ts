import { Store, StoreConfig } from '@datorama/akita'
import { IUser } from './user.model'

@StoreConfig({ name: 'user' })
export class UserStore extends Store<IUser> {
  constructor() {
    super({})
  }
}

export const userStore = new UserStore()
