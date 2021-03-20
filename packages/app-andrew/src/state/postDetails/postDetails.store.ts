import { Store, StoreConfig } from '@datorama/akita'
import { IPostDetailsState, Status } from './postDetails.model'

@StoreConfig({ name: 'postDetails' })
export class PostDetailsStore extends Store<IPostDetailsState> {
  constructor() {
    super({
      isOpen: false,
      status: Status.isLoading,
      commentsStatus: Status.isLoading,
      post: undefined,
      comments: undefined,
    })
  }
}

export const postDetailsStore = new PostDetailsStore()
