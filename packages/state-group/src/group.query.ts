import { Query } from '@datorama/akita'
import { UserQuery, userQuery } from '@gtms/state-user'
import { IGroupStore, groupStore, GroupsStore } from './group.store'
import { FileStatus } from '@gtms/commons'

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

  public getId = (values = this.getValue()) => {
    return values.group?.id
  }

  public getAvatarFileStatus = (values = this.getValue()): FileStatus => {
    return values.group?.avatar?.status || FileStatus.notExists
  }

  public hasAvatar = (
    size: '35x35' | '50x50' | '200x200',
    values = this.getValue()
  ) => {
    if (
      !values.group ||
      !values.group.avatar ||
      !values.group.avatar.files ||
      !values.group.avatar.files[size]
    ) {
      return false
    }

    return true
  }

  public getAvatar = (
    size: '35x35' | '50x50' | '200x200',
    values = this.getValue()
  ) => {
    if (this.hasAvatar(size, values)) {
      const avatar: any = values.group?.avatar?.files || {}

      return avatar[size]
    }

    return {
      jpg: `//via.placeholder.com/${size}`,
    }
  }

  constructor(protected store: GroupsStore, private userQuery: UserQuery) {
    super(store)
  }
}

export const groupQuery = new GroupQuery(groupStore, userQuery)
