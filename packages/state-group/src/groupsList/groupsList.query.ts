import { QueryEntity } from '@datorama/akita'
import {
  GroupsListState,
  groupsListStore,
  GroupsListStore,
} from './groupsList.store'

export class GroupsListQuery extends QueryEntity<GroupsListState> {
  constructor(protected store: GroupsListStore) {
    super(store)
  }
}

export const groupsListQuery = new GroupsListQuery(groupsListStore)
