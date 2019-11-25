import { Query } from '@datorama/akita'
import { userStore, UserStore } from './user.store'
import { IUser } from './user.model'

export class UserQuery extends Query<IUser> {
  hasData$ = this.select(
    values =>
      typeof values.id === 'string' &&
      values.id !== '' &&
      typeof values.email === 'string' &&
      values.email !== ''
  )

  hasSession$ = this.select(
    values =>
      values.session &&
      values.session.accessToken !== '' &&
      values.session.refreshToken !== ''
  )

  constructor(protected store: UserStore) {
    super(store)
  }

  isLoggedIn() {
    return false //!!this.getValue().token;
  }
}

export const userQuery = new UserQuery(userStore)
