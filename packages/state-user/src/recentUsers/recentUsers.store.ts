import { EntityState, EntityStore } from '@datorama/akita'
import { IUser } from '@gtms/commons/models'

export type RecentUsersState = EntityState<IUser, number>

export class RecentUsersStore extends EntityStore<RecentUsersState> {
  constructor() {
    super(undefined, {
      name: 'recentUsers',
    })
  }
}

export const recentUsersStore = new RecentUsersStore()
