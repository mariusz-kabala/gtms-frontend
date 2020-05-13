import { QueryEntity } from '@datorama/akita'
import {
  RecentUsersState,
  recentUsersStore,
  RecentUsersStore,
} from './recentUsers.store'

export class RecentUsersQuery extends QueryEntity<RecentUsersState> {
  constructor(protected store: RecentUsersStore) {
    super(store)
  }
}

export const recentUsersQuery = new RecentUsersQuery(recentUsersStore)
