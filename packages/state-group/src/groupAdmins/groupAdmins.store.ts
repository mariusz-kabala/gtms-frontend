import { EntityState, EntityStore } from '@datorama/akita'
import { IUser } from '@gtms/commons/models'

export type GroupAdminsState = EntityState<IUser, number>

export class GroupAdminsStore extends EntityStore<GroupAdminsState> {
  constructor() {
    super(undefined, {
      name: 'groupAdmins',
    })
  }
}

export const groupAdminsStore = new GroupAdminsStore()
