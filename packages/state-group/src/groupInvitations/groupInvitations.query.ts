import { QueryEntity } from '@datorama/akita'
import { Observable } from 'rxjs'
import { IGroupInvitation } from '@gtms/commons/models'
import {
  GroupInvitationsState,
  GroupInvitationsStore,
  groupInvitationsStore,
} from './groupInvitations.store'

export interface IGroupInvitations {
  isLoading: boolean
  errorOccured: boolean
  records: IGroupInvitation[]
}

export class GroupInvitationsQuery extends QueryEntity<GroupInvitationsState> {
  public getGroupInvitations = (
    values = this.getValue()
  ): IGroupInvitations => {
    return {
      isLoading: values.loading || false,
      errorOccured: values.error,
      records: this.getAll(),
    }
  }

  public getGroupInvitations$: Observable<
    IGroupInvitations
  > = this.select((values) => this.getGroupInvitations(values))
  constructor(protected store: GroupInvitationsStore) {
    super(store)
  }
}

export const groupInvitationsQuery = new GroupInvitationsQuery(
  groupInvitationsStore
)
