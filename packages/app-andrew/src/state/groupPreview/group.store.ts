import { Store, StoreConfig } from '@datorama/akita'
import { IGroupPreviewState } from './group.model'

@StoreConfig({ name: 'groupPreview' })
export class GroupPreviewStore extends Store<IGroupPreviewState> {
  constructor() {
    super({
      isOpen: false,
      isLoaded: false,
      isLoading: false,
      errorOccured: false,
      name: '',
      slug: '',
      tags: [],
    })
  }
}

export const groupPreviewStore = new GroupPreviewStore()
