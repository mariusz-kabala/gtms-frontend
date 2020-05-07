import { Query } from '@datorama/akita'
import { userStore, UserStore, IUserStore } from './user.store'
import { map } from 'rxjs/operators'
import { combineLatest, Observable } from 'rxjs'

export interface IAccountDetails {
  id: string
  name?: string
  surname?: string
  phone?: string
  email: string
  roles: string[]
  tags: string[]
}

export class UserQuery extends Query<IUserStore> {
  public id = (values = this.getValue()): string | undefined => values.id
  public hasData$: Observable<boolean> = this.select((values) =>
    this.hasData(values)
  )

  public hasData = (values = this.getValue()): boolean =>
    typeof values.id === 'string' &&
    values.id !== '' &&
    typeof values.email === 'string' &&
    values.email !== ''

  public isActive$: Observable<boolean> = combineLatest(
    this.hasData$,
    this.select((values) => values.isActive)
  ).pipe(map(([hasData, isActive]) => !!(hasData && isActive)))

  public isActive = (values = this.getValue()): boolean =>
    this.hasData(values) && values.isActive

  public hasSession$: Observable<boolean> = this.select((values) =>
    this.hasSession(values)
  )

  public hasSession = (values = this.getValue()): boolean =>
    !!(values.session?.accessToken && values.session?.refreshToken)

  public jwt = (values = this.getValue()): string | undefined => {
    if (!this.isLogged(values)) {
      return
    }

    return values.session?.accessToken.value
  }

  public hasRoles$ = (rolesToCheck: string[]): Observable<boolean> =>
    this.select((values) => this.hasRoles(rolesToCheck, values))

  public hasRoles = (
    rolesToCheck: string[],
    values = this.getValue()
  ): boolean => {
    const { roles, isBlocked } = values

    if (!Array.isArray(roles) || isBlocked) {
      return false
    }

    for (const role of rolesToCheck) {
      if (!roles.includes(role)) {
        return false
      }
    }

    return true
  }

  public isInitialized$: Observable<boolean> = this.select((values) =>
    this.isInitialized(values)
  )

  public isInitialized = (values = this.getValue()): boolean =>
    values.isInitialized

  public isLogged$: Observable<boolean> = this.select((values) =>
    this.isLogged(values)
  )

  public isLogged = (values = this.getValue()): boolean => {
    const now = new Date().getTime()

    return !!(
      values.isActive &&
      !values.isBlocked &&
      values.session?.accessToken?.expiresAt &&
      values.session?.refreshToken?.expiresAt &&
      (values.session.accessToken.expiresAt > now ||
        values.session.refreshToken.expiresAt > now)
    )
  }

  public accountDetails = (values = this.getValue()): IAccountDetails => ({
    id: values.id,
    name: values.name,
    surname: values.surname,
    phone: values.phone,
    email: values.email,
    roles: values.roles,
    tags: values.tags,
  })

  public accountDetails$: Observable<IAccountDetails> = this.select((values) =>
    this.accountDetails(values)
  )

  constructor(protected store: UserStore) {
    super(store)
  }
}

export const userQuery = new UserQuery(userStore)
