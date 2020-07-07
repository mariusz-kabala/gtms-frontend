import { userQuery } from '@gtms/state-user'
import { promotedTagsQuery } from '@gtms/state-tag'
import { groupQuery, groupMembersQuery } from '@gtms/state-group'
import { postCommentsQuery } from '@gtms/state-comment'
import { postsQuery } from '@gtms/state-post'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  IPost,
  IGroup,
  IPromotedTag,
  IUser,
  IAccountDetails,
  IComment,
} from '@gtms/commons/models'

export interface IGroupPageState {
  isLoading: boolean
  hasNoAccess: boolean
  notFound: boolean
  errorOccured: boolean
  group: IGroup | null
  posts: IPost[]
  activePost?: IPost
  comments?: {
    offset: number
    limit: number
    total: number
    isLoading: boolean
    errorOccured: boolean
    comments: IComment[]
  }
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

export const groupPageState = (): IGroupPageState => {
  const promotedTagsState = promotedTagsQuery.getValue()
  const groupMembersState = groupMembersQuery.getValue()
  const postCommentsState = postCommentsQuery.getValue()
  const activePost = postsQuery.getActive() as IPost | undefined
  return {
    ...groupQuery.getValue(),
    posts: postsQuery.getAll(),
    user: userQuery.isLogged() ? userQuery.accountDetails() : null,
    promotedTags: {
      tags: promotedTagsQuery.getAll(),
      isLoading: promotedTagsState.loading || false,
      errorOccured: promotedTagsState.error,
    },
    members: {
      isLoading: groupMembersState.loading || false,
      errorOccured: groupMembersState.error || false,
      users: groupMembersQuery.getAll(),
    },
    activePost,
    comments: activePost
      ? {
          comments: postCommentsQuery.getAll(),
          isLoading: postCommentsState.loading || false,
          errorOccured: postCommentsState.error || false,
          offset: postCommentsState.offset,
          limit: postCommentsState.limit,
          total: postCommentsState.total,
        }
      : undefined,
  }
}

export const groupPageState$: Observable<IGroupPageState> = combineLatest(
  groupQuery.allState$,
  postsQuery.selectAll(),
  userQuery.accountDetails$,
  promotedTagsQuery.selectAll(),
  promotedTagsQuery.selectLoading(),
  groupMembersQuery.selectAll(),
  postCommentsQuery.selectAll()
).pipe(map(() => groupPageState()))
