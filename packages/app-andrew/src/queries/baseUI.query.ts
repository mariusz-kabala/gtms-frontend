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

export interface INavigationProps {
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
    private myGroupsQuery: MyGroupsQuery,
    private notificationsQuery: NotificationsQuery
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
//
export const baseUIQuery = new BaseUIQuery(
  userQuery,
  uiQuery,
  myGroupsQuery,
  notificationsQuery
)