import { QueryEntity } from '@datorama/akita'
import {
  RecentGroupsState,
  recentGroupsStore,
  RecentGroupsStore,
} from './recentGroups.store'

export class RecentGroupsQuery extends QueryEntity<RecentGroupsState> {
  constructor(protected store: RecentGroupsStore) {
    super(store)
  }
}

export const recentGroupsQuery = new RecentGroupsQuery(recentGroupsStore)
