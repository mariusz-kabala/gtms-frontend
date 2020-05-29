import { QueryEntity } from '@datorama/akita'
import {
  GroupMembersState,
  GroupMembersStore,
  groupMembersStore,
} from './groupMembers.store'

export class GroupMembersQuery extends QueryEntity<GroupMembersState> {
  constructor(protected store: GroupMembersStore) {
    super(store)
  }
}

export const groupMembersQuery = new GroupMembersQuery(groupMembersStore)
