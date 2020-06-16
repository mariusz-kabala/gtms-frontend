import {
  UserQuery,
  userQuery,
  MyGroupsQuery,
  myGroupsQuery,
} from '@gtms/state-user'
import {
  notificationsQuery,
  NotificationsQuery,
  INotification,
} from '@gtms/state-notification'
import { IGroup } from '@gtms/commons'
import { uiQuery, UIQuery } from 'state'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export interface INavigationGroupProps {
  isLogged: boolean
  userAvatar: {
    jpg: string
    webp?: string
  } | null
}

export interface INotificationsSidebarProps {
  isOpen: boolean
  notifications: INotification[]
  unreadCount: number
}

export interface INavigationMainProps {
  isVisible: boolean
  isLogged: boolean
  isLoaded: boolean
  groups: IGroup[]
}

export class BaseUIQuery {
  constructor(
    private userQuery: UserQuery,
    private uiQuery: UIQuery,
    private myGroupsQuery: MyGroupsQuery,
    private notificationsQuery: NotificationsQuery
  ) {}

  public navigationGroup = (): INavigationGroupProps => {
    const isLogged = this.userQuery.isLogged()

    return {
      isLogged,
      userAvatar: isLogged ? this.userQuery.getAvatar('50x50') : null,
    }
  }

  public navigationGroup$: Observable<INavigationGroupProps> = this.userQuery.select(() =>
    this.navigationGroup()
  )

  public notificationsSidebar = (): INotificationsSidebarProps => {
    return {
      isOpen:
        this.userQuery.isLogged() && this.uiQuery.isNotificationsBarOpen(),
      notifications: this.notificationsQuery.getAll(),
      unreadCount: this.notificationsQuery.unread().length,
    }
  }

  public notificationsSidebar$: Observable<
    INotificationsSidebarProps
  > = combineLatest(
    this.userQuery.isLogged$,
    this.uiQuery.isNotificationsBarOpen$,
    this.notificationsQuery.select()
  ).pipe(map(() => this.notificationsSidebar()))

  public navigationMain = (): INavigationMainProps => {
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

  public navigationMain$: Observable<INavigationMainProps> = combineLatest(
    this.userQuery.isLogged$,
    this.myGroupsQuery.status$,
    this.myGroupsQuery.favGroups$
  ).pipe(map(() => this.navigationMain()))
}
//
export const baseUIQuery = new BaseUIQuery(
  userQuery,
  uiQuery,
  myGroupsQuery,
  notificationsQuery
)
