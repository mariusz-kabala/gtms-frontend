import { EntityState, EntityStore } from '@datorama/akita'
import { IComment } from '@gtms/commons/models'

export interface IPostCommentsState extends EntityState<IComment, string> {
  offset: number
  total: number
}

export class PostCommentsStore extends EntityStore<IPostCommentsState> {
  constructor() {
    super(undefined, {
      name: 'postComments',
      resettable: true,
    })
  }
}

export const postCommentsStore = new PostCommentsStore()
