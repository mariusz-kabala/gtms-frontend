import { EntityState, EntityStore } from '@datorama/akita'
import { IUser } from '@gtms/commons/models'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'

export interface UsersListState extends EntityState<IUser, string> {
  offset: number
  limit: number
}

export class UsersListStore extends EntityStore<UsersListState> {
  constructor() {
    super(undefined, {
      name: 'usersList',
      resettable: true,
    })
  }

  akitaPreAddEntity = (user: IUser) => {
    if (
      user.avatar?.status === FileStatus.ready &&
      Array.isArray(user.avatar?.files)
    ) {
      user.avatar.files = parseFiles(user.avatar.files)
    }

    return user
  }
}

export const usersListStore = new UsersListStore()
