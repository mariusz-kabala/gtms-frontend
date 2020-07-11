import { QueryEntity, Order } from '@datorama/akita'
import {
  IPostsSearchState,
  PostsSearchStore,
  postsSearchStore,
} from './search.store'

export class PostsSearchQuery extends QueryEntity<IPostsSearchState> {
  constructor(protected store: PostsSearchStore) {
    super(store, {
      sortBy: 'createdAt',
      sortByOrder: Order.DESC,
    })
  }
}

export const postsSearchQuery = new PostsSearchQuery(postsSearchStore)
