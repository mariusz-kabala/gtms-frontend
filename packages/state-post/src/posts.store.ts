import { EntityState, EntityStore } from '@datorama/akita'
import { IPost } from '@gtms/commons/models'
import { Sorting } from '@gtms/api-post'

export interface IPostsState extends EntityState<IPost, string> {
  offset: number
  total: number
  tags: string[]
  sort: Sorting
}

export class PostsStore extends EntityStore<IPostsState> {
  constructor() {
    super(
      {
        offset: 0,
        total: -1,
        sort: Sorting.latest,
        tags: [],
      },
      {
        name: 'posts',
        resettable: true,
      }
    )
  }
}

export const postsStore = new PostsStore()
