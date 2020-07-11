import { groupsListQuery } from '@gtms/state-group'
import { usersListQuery } from '@gtms/state-user'
import { postsSearchQuery } from '@gtms/state-post'
import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { IGroup, IUser, IPost } from '@gtms/commons/models'

export interface ITagPageState {
  groups: {
    isLoading: boolean
    errorOccured: boolean
    offset: number
    limit: number
    docs: IGroup[]
  }
  users: {
    isLoading: boolean
    errorOccured: boolean
    offset: number
    limit: number
    docs: IUser[]
  }
  posts: {
    isLoading: boolean
    errorOccured: boolean
    offset: number
    limit: number
    docs: IPost[]
  }
}

export const tagPageState = (): ITagPageState => {
  const groups = groupsListQuery.getValue()
  const users = usersListQuery.getValue()
  const posts = postsSearchQuery.getValue()

  return {
    groups: {
      isLoading: groups.loading || false,
      errorOccured: groups.error,
      offset: groups.offset,
      limit: groups.limit,
      docs: groupsListQuery.getAll(),
    },
    users: {
      isLoading: users.loading || false,
      errorOccured: users.error,
      offset: users.offset,
      limit: users.limit,
      docs: usersListQuery.getAll(),
    },
    posts: {
      isLoading: posts.loading || false,
      errorOccured: posts.error,
      offset: posts.offset,
      limit: posts.limit,
      docs: postsSearchQuery.getAll(),
    },
  }
}

export const tagPageState$: Observable<ITagPageState> = combineLatest(
  groupsListQuery.selectAll(),
  usersListQuery.selectAll(),
  postsSearchQuery.selectAll()
).pipe(map(() => tagPageState()))
