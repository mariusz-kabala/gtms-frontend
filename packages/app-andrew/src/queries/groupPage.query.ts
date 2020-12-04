import { userQuery } from '@gtms/state-user'
import { Sorting } from '@gtms/api-post'
import { groupQuery, groupMembersQuery } from '@gtms/state-group'
import { postCommentsQuery } from '@gtms/state-comment'
import { postsQuery } from '@gtms/state-post'
import { uiQuery } from 'state'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  IPost,
  IGroup,
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
  postsSorting: Sorting
  activeTags?: string[]
  activeUsers?: string[]
  activePost?: IPost
  showPromoted: boolean
  showUsers: boolean
  comments?: {
    offset: number
    limit: number
    total: number
    isLoading: boolean
    errorOccured: boolean
    comments: IComment[]
  }
  user: IAccountDetails | null
  members: {
    isLoading: boolean
    errorOccured: boolean
    users: IUser[]
  }
  pagination: {
    limit: number
    offset: number
    total: number
  }
}

export const groupPageState = (): IGroupPageState => {
  const groupMembersState = groupMembersQuery.getValue()
  const postCommentsState = postCommentsQuery.getValue()
  const postsState = postsQuery.getValue()
  const activePost = postsQuery.getActive() as IPost | undefined
  const group = groupQuery.getValue()

  return {
    ...group,
    posts: postsQuery.getAll(),
    postsSorting: postsState.sort,
    activeTags: postsState.tags || [],
    activeUsers: postsState.users || [],
    user: userQuery.isLogged() ? userQuery.accountDetails() : null,
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
    pagination: {
      limit: postsState.limit,
      offset: postsState.offset,
      total: postsState.total,
    },
    ...(group.group?.id
      ? uiQuery.groupState(group.group.id)
      : {
          showPromoted: false,
          showUsers: false,
        }),
  }
}

export const groupPageState$: Observable<IGroupPageState> = combineLatest(
  groupQuery.allState$,
  postsQuery.selectAll(),
  userQuery.accountDetails$,
  groupMembersQuery.selectAll(),
  postCommentsQuery.selectAll(),
  uiQuery.select()
).pipe(map(() => groupPageState()))
