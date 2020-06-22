import { EntityState, EntityStore } from '@datorama/akita'
import { IUser } from '@gtms/commons/models'

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
}

export const usersListStore = new UsersListStore()
