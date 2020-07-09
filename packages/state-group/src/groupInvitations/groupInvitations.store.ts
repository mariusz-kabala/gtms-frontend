import { IGroupInvitation } from '@gtms/commons/models'
import { EntityState, EntityStore } from '@datorama/akita'

export interface GroupInvitationsState
  extends EntityState<IGroupInvitation, number> {
  offset: number
  total: number
}

export class GroupInvitationsStore extends EntityStore<GroupInvitationsState> {
  constructor() {
    super(undefined, {
      name: 'groupInvitations',
      resettable: true,
    })
  }
}

export const groupInvitationsStore = new GroupInvitationsStore()
