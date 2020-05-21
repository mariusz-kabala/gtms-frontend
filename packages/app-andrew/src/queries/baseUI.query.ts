import {
  UserQuery,
  userQuery,
  MyGroupsQuery,
  myGroupsQuery,
} from '@gtms/state-user'
import { IGroup } from '@gtms/commons'
import { uiQuery, UIQuery } from 'state'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface INavigationProps {
  isLogged: boolean
  userAvatar: {
    jpg: string
    webp?: string
  } | null
}

export interface INotificationsSidebarProps {
  isOpen: boolean
}

export interface INavigationDotsProps {
  isVisible: boolean
  isLogged: boolean
  isLoaded: boolean
  groups: IGroup[]
}

export class BaseUIQuery {
  constructor(
    private userQuery: UserQuery,
    private uiQuery: UIQuery,
    private myGroupsQuery: MyGroupsQuery
  ) {}

  public navigation = (): INavigationProps => {
    const isLogged = this.userQuery.isLogged()

    return {
      isLogged,
      userAvatar: isLogged ? this.userQuery.getAvatar('50x50') : null,
    }
  }

  public navigation$: Observable<INavigationProps> = this.userQuery.select(() =>
    this.navigation()
  )

  public notificationsSidebar = (): INotificationsSidebarProps => {
    return {
      isOpen:
        this.userQuery.isLogged() && this.uiQuery.isNotificationsBarOpen(),
    }
  }

  public notificationsSidebar$: Observable<
    INotificationsSidebarProps
  > = combineLatest(
    this.userQuery.isLogged$,
    this.uiQuery.isNotificationsBarOpen$
  ).pipe(map(() => this.notificationsSidebar()))

  public navigationDots = (): INavigationDotsProps => {
    const status = this.myGroupsQuery.status()
    const isLogged = this.userQuery.isLogged()

    return {
      isVisible:
        isLogged &&
        !status.errorOccurred &&
        !status.isLoading &&
        status.isLoaded,
      isLoaded: status.isLoaded,
      isLogged,
      groups: this.myGroupsQuery.favGroups(),
    }
  }

  public navigationDots$: Observable<INavigationDotsProps> = combineLatest(
    this.userQuery.isLogged$,
    this.myGroupsQuery.status$,
    this.myGroupsQuery.favGroups$
  ).pipe(map(() => this.navigationDots()))
}

export const baseUIQuery = new BaseUIQuery(userQuery, uiQuery, myGroupsQuery)
