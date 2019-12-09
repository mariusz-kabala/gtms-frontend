import { Query } from '@datorama/akita'
import { userStore, UserStore, IUserStore } from './user.store'
import { map } from 'rxjs/operators'
import { combineLatest } from 'rxjs'

export class UserQuery extends Query<IUserStore> {
  public hasData$ = this.select(values => this.hasData(values))

  public hasData = (values = this.getValue()) =>
    typeof values.id === 'string' &&
    values.id !== '' &&
    typeof values.email === 'string' &&
    values.email !== ''

  public isActive$ = combineLatest(
    this.hasData$,
    this.select(values => values.isActive)
  ).pipe(map(([hasData, isActive]) => hasData && isActive))

  public hasSession$ = this.select(values => this.hasSession(values))

  public hasSession = (values = this.getValue()) =>
    values.session && values.session.accessToken && values.session.refreshToken

  public hasRoles = (rolesToCheck: string[]) =>
    this.select(values => {
      const { roles } = values

      for (const role of rolesToCheck) {
        if (!roles.includes(role)) {
          return false
        }
      }

      return true
    })

  public isInitialized$ = this.select(values => values.isInitialized)

  public isLogged$ = this.select(values => {
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
