import { Query } from '@datorama/akita'
import { Observable } from 'rxjs'
import {
  IRecentlyViewedTagsState,
  RecentlyViewedTagsStore,
  recentlyViewedTagsStore,
  IGroupRecentlyViewedTags,
} from './recentlyViewedTags.store'

export class RecentlyViewedTagsQuery extends Query<IRecentlyViewedTagsState> {
  constructor(protected store: RecentlyViewedTagsStore) {
    super(store)
  }

  public getForGroup = (
    groupId: string,
    values = this.getValue()
  ): IGroupRecentlyViewedTags => {
    return values[groupId]
      ? values[groupId]
      : {
          isLoading: false,
          isLoaded: false,
          errorOccured: false,
          tags: [],
        }
  }

  public getForGroup$ = (
    groupId: string
  ): Observable<IGroupRecentlyViewedTags> =>
    this.select((values) => this.getForGroup(groupId, values))
}

export const recentlyViewedTagsQuery = new RecentlyViewedTagsQuery(
  recentlyViewedTagsStore
)
