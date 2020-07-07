import { QueryEntity, Order } from '@datorama/akita'
import {
  IPostCommentsState,
  PostCommentsStore,
  postCommentsStore,
} from './comments.store'

export class PostCommentsQuery extends QueryEntity<IPostCommentsState> {
  constructor(protected store: PostCommentsStore) {
    super(store, {
      sortBy: 'createdAt',
      sortByOrder: Order.ASC,
    })
  }
}

export const postCommentsQuery = new PostCommentsQuery(postCommentsStore)
