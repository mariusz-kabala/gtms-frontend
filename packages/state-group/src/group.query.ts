import { Query } from '@datorama/akita'
import { UserQuery, userQuery } from '@gtms/state-user'
import { IGroupStore, groupStore, GroupsStore } from './group.store'

export class GroupQuery extends Query<IGroupStore> {
  public allState$ = this.select()

  public hasAdminRights = (values = this.getValue()) => {
    return (
      !values.isLoading &&
      !values.hasNoAccess &&
      !values.notFound &&
      this.userQuery.isLogged() &&
      values.group?.owner === this.userQuery.id()
    )
  }

  constructor(protected store: GroupsStore, private userQuery: UserQuery) {
    super(store)
  }
}

export const groupQuery = new GroupQuery(groupStore, userQuery)
