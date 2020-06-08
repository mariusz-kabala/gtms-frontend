import { Query } from '@datorama/akita'
import {
  userDetailsStore,
  UserDetailsStore,
  IUserDetailsStore,
} from './userDetails.store'

export class UserDetailsQuery extends Query<IUserDetailsStore> {
  constructor(protected store: UserDetailsStore) {
    super(store)
  }
}

export const userDetailsQuery = new UserDetailsQuery(userDetailsStore)
