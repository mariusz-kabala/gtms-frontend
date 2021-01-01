import { Store, StoreConfig } from '@datorama/akita'
import { IUserPreviewState } from './userPreview.model'

@StoreConfig({ name: 'userPreview' })
export class UserPreviewStore extends Store<IUserPreviewState> {
  constructor() {
    super({
      isOpen: false,
      isLoaded: false,
      isLoading: false,
      errorOccured: false,
    })
  }
}

export const userPreviewStore = new UserPreviewStore()
