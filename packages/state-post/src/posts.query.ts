import { QueryEntity, Order } from '@datorama/akita'
import { IPostsState, PostsStore, postsStore } from './posts.store'

export class PostsQuery extends QueryEntity<IPostsState> {
  constructor(protected store: PostsStore) {
    super(store, {
      sortBy: 'createdAt',
      sortByOrder: Order.DESC,
    })
  }
}

export const postsQuery = new PostsQuery(postsStore)
