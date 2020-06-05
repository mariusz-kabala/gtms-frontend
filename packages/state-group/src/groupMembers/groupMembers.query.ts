import { QueryEntity } from '@datorama/akita'
import {
  GroupMembersState,
  GroupMembersStore,
  groupMembersStore,
} from './groupMembers.store'
import { Observable } from 'rxjs'
import { IUser } from '@gtms/commons/models'

export interface IGroupMembers {
  isLoading: boolean
  errorOccured: boolean
  records: IUser[]
}

export class GroupMembersQuery extends QueryEntity<GroupMembersState> {
  public getGroupMembers = (values = this.getValue()): IGroupMembers => {
    return {
      isLoading: values.loading || false,
      errorOccured: values.error,
      records: this.getAll(),
    }
  }

  public getGroupMembers$: Observable<IGroupMembers> = this.select((values) =>
    this.getGroupMembers(values)
  )
  constructor(protected store: GroupMembersStore) {
    super(store)
  }
}

export const groupMembersQuery = new GroupMembersQuery(groupMembersStore)
