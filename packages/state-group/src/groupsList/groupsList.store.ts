import { EntityState, EntityStore } from '@datorama/akita'
import { IGroup } from '@gtms/commons/models'

export interface GroupsListState extends EntityState<IGroup, string> {
  offset: number
  limit: number
}

export class GroupsListStore extends EntityStore<GroupsListState> {
  constructor() {
    super(undefined, {
      name: 'groupsList',
      resettable: true,
    })
  }
}

export const groupsListStore = new GroupsListStore()
