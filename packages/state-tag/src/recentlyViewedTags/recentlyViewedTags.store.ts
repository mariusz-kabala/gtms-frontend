import { Store } from '@datorama/akita'

export interface IGroupRecentlyViewedTags {
  isLoading: boolean
  isLoaded: boolean
  errorOccured: boolean
  tags: string[]
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
