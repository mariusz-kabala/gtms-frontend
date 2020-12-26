import { Query } from '@datorama/akita'
import { Observable } from 'rxjs'
import {
  IGroupFavTags,
  IFavTagsState,
  GroupFavTagsStore,
  groupFavTagsStore,
} from './favTags.store'

export class GroupFavTagsQuery extends Query<IFavTagsState> {
  constructor(protected store: GroupFavTagsStore) {
    super(store)
  }

  public getForGroup = (
    groupId: string,
    values = this.getValue()
  ): IGroupFavTags => {
    return values[groupId]
      ? values[groupId]
      : {
          isLoading: false,
          isLoaded: false,
          errorOccured: false,
          tags: [],
        }
  }

  public getForGroup$ = (groupId: string): Observable<IGroupFavTags> =>
    this.select((values) => this.getForGroup(groupId, values))
}

export const groupFavTagsQuery = new GroupFavTagsQuery(groupFavTagsStore)
