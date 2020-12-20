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
}

export const groupFavTagsQuery = new GroupFavTagsQuery(groupFavTagsStore)
