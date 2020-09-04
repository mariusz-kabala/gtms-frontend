import { EntityState, EntityStore } from '@datorama/akita'
import { IPost } from '@gtms/commons/models'
import { Sorting } from '@gtms/api-post'

export interface IPostsState extends EntityState<IPost, string> {
  offset: number
  total: number
  tags: string[]
  users: string[]
  sort: Sorting
  limit: number
}

export class PostsStore extends EntityStore<IPostsState> {
  constructor() {
    super(
      {
        offset: 0,
        limit: 50,
        total: -1,
        sort: Sorting.latest,
        tags: [],
        users: [],
      },
      {
        name: 'posts',
        resettable: true,
      }
    )
  }
}

export const postsStore = new PostsStore()
