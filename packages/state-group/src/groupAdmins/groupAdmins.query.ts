import { QueryEntity } from '@datorama/akita'
import {
  GroupAdminsState,
  GroupAdminsStore,
  groupAdminsStore,
} from './groupAdmins.store'

export class GroupAdminsQuery extends QueryEntity<GroupAdminsState> {
  constructor(protected store: GroupAdminsStore) {
    super(store)
  }
}

export const groupAdminsQuery = new GroupAdminsQuery(groupAdminsStore)
