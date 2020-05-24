import { IAccountDetails, userQuery } from '@gtms/state-user'
import { promotedTagsQuery } from '@gtms/state-tag'
import { groupQuery } from '@gtms/state-group'
import { postsQuery } from '@gtms/state-post'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { IPost, IGroup, IPromotedTag } from '@gtms/commons/models'

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
})

export const groupPageState$: Observable<IGroupPageState> = combineLatest(
  groupQuery.allState$,
  postsQuery.selectAll(),
  userQuery.accountDetails$,
  promotedTagsQuery.selectAll(),
  promotedTagsQuery.selectLoading()
).pipe(map(() => groupPageState()))
