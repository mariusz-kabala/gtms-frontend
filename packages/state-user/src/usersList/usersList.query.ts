import { QueryEntity } from '@datorama/akita'
import {
  UsersListState,
  usersListStore,
  UsersListStore,
} from './usersList.store'

export class UsersListQuery extends QueryEntity<UsersListState> {
  constructor(protected store: UsersListStore) {
    super(store)
  }
}

export const usersListQuery = new UsersListQuery(usersListStore)
