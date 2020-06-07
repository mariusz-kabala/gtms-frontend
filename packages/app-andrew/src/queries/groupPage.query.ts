import { IAccountDetails, userQuery } from '@gtms/state-user'
import { promotedTagsQuery } from '@gtms/state-tag'
import { groupQuery, groupMembersQuery } from '@gtms/state-group'
import { postsQuery } from '@gtms/state-post'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { IPost, IGroup, IPromotedTag, IUser } from '@gtms/commons/models'

export interface IGroupPageState {
  isLoading: boolean
  hasNoAccess: boolean
  notFound: boolean
  errorOccured: boolean
  group: IGroup | null
  posts: IPost[]
  user: IAccountDetails | null
  promotedTags: {
    tags: IPromotedTag[]
    isLoading: boolean
    errorOccured: boolean
  }
  members: {
    isLoading: boolean
    errorOccured: boolean
    users: IUser[]
  }
}

export const groupPageState = (): IGroupPageState => ({
  ...groupQuery.getValue(),
  posts: postsQuery.getAll(),
  user: userQuery.isLogged() ? userQuery.accountDetails() : null,
  promotedTags: {
    tags: promotedTagsQuery.getAll(),
    isLoading: promotedTagsQuery.getValue().loading || false,
    errorOccured: promotedTagsQuery.getValue().error,
  },
  members: {
    isLoading: groupMembersQuery.getValue().loading || false,
    errorOccured: groupMembersQuery.getValue().error || false,
    users: groupMembersQuery.getAll(),
  },
})

export const groupPageState$: Observable<IGroupPageState> = combineLatest(
  groupQuery.allState$,
  postsQuery.selectAll(),
  userQuery.accountDetails$,
  promotedTagsQuery.selectAll(),
  promotedTagsQuery.selectLoading(),
  groupMembersQuery.selectAll()
).pipe(map(() => groupPageState()))
