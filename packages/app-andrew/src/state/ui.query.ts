import { Query } from '@datorama/akita'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { userQuery, UserQuery } from '@gtms/state-user'
import { IUI } from './ui.model'
import { UIStore, uiStore } from './ui.store'

export class UIQuery extends Query<IUI> {
  public isLoginModalOpen = (values = this.getValue()) => {
    return values.isLoginModalOpen && !this.userQuery.isLogged()
  }

  public isLoginModalOpen$: Observable<boolean> = combineLatest(
    this.select(),
    this.userQuery.isLogged$
  ).pipe(
    map(([{ isLoginModalOpen }, isLogged]: any): boolean => {
      return !isLogged && isLoginModalOpen
    })
  )

  public isNotificationsBarOpen = (values = this.getValue()) => {
    return values.isNotificationsBarOpen
  }

  public isNotificationsBarOpen$: Observable<boolean> = this.select((values) =>
    this.isNotificationsBarOpen(values)
  )

  constructor(protected store: UIStore, private userQuery: UserQuery) {
    super(store)
  }
}

export const uiQuery = new UIQuery(uiStore, userQuery)
