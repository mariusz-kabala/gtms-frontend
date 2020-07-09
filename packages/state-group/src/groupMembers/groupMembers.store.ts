import { EntityState, EntityStore } from '@datorama/akita'
import { IUser } from '@gtms/commons/models'

export interface GroupMembersState extends EntityState<IUser, number> {
  offset: number
  total: number
}

export class GroupMembersStore extends EntityStore<GroupMembersState> {
  constructor() {
    super(undefined, {
      name: 'groupMembers',
      resettable: true,
    })
  }
}

export const groupMembersStore = new GroupMembersStore()
