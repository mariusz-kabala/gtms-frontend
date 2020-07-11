import { EntityState, EntityStore } from '@datorama/akita'
import { IPost } from '@gtms/commons/models'

export interface ISearchQuery {
  tags: string[]
  groups: string[]
  users: string[]
}

export interface IPostsSearchState extends EntityState<IPost, string> {
  offset: number
  limit: number
  total: number
  query: ISearchQuery
}

export class PostsSearchStore extends EntityStore<IPostsSearchState> {
  constructor() {
    super(
      {
        offset: 0,
        limit: 50,
        total: 0,
        query: {
          tags: [],
          groups: [],
          users: [],
        },
      },
      {
        name: 'postsSearch',
        resettable: true,
      }
    )
  }
}

export const postsSearchStore = new PostsSearchStore()
