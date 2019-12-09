import { Query } from '@datorama/akita'
import { userStore, UserStore, IUserStore } from './user.store'
import { map } from 'rxjs/operators'
import { combineLatest } from 'rxjs'

export class UserQuery extends Query<IUserStore> {
  hasData$ = this.select(
    values =>
      typeof values.id === 'string' &&
      values.id !== '' &&
      typeof values.email === 'string' &&
      values.email !== ''
  )

  isActive$ = combineLatest(
    this.hasData$,
    this.select(values => values.isActive)
  ).pipe(map(([hasData, isActive]) => hasData && isActive))

  hasSession$ = this.select(
    values =>
      values.session &&
      values.session.accessToken &&
      values.session.refreshToken
  )

  hasRoles = (rolesToCheck: string[]) =>
    this.select(values => {
      const { roles } = values

      for (const role of rolesToCheck) {
        if (!roles.includes(role)) {
          return false
        }
      }

      return true
    })

  isInitialized$ = this.select(values => values.isInitialized)

  isLogged$ = this.select(values => {
    const now = new Date().getTime()

    return (
      values.session &&
      values.session.accessToken &&
      values.session.refreshToken &&
      (values.session.accessToken.expiresAt > now ||
        values.session.refreshToken.expiresAt > now)
    )
  })

  constructor(protected store: UserStore) {
    super(store)
  }
}

export const userQuery = new UserQuery(userStore)
