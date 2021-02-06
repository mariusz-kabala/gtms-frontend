import { Store } from '@datorama/akita'
import { IRecentlyViewedTag } from '@gtms/commons/models'

export interface IGroupRecentlyViewedTags {
  isLoading: boolean
  isLoaded: boolean
  errorOccured: boolean
  tags: IRecentlyViewedTag[]
}

export interface IRecentlyViewedTagsState {
  [groupId: string]: IGroupRecentlyViewedTags
}

export class RecentlyViewedTagsStore extends Store<IRecentlyViewedTagsState> {
  constructor() {
    super(
      {},
      {
        name: 'recentlyViewedTags',
      }
    )
  }
}

export const recentlyViewedTagsStore = new RecentlyViewedTagsStore()
