import { EntityState, EntityStore } from '@datorama/akita'
import { IPost } from '@gtms/commons/models'

export interface IPostsState extends EntityState<IPost, number> {
  offset: number
  total: number
}

export class PostsStore extends EntityStore<IPostsState> {
  constructor() {
    super(undefined, {
      name: 'posts',
    })
  }
}

export const postsStore = new PostsStore()
