import { EntityState, EntityStore } from '@datorama/akita'
import { IGroup } from '@gtms/commons/models'

export type RecentGroupsState = EntityState<IGroup, number>

export class RecentGroupsStore extends EntityStore<RecentGroupsState> {
  constructor() {
    super(undefined, {
      name: 'recentGroups',
    })
  }
}

export const recentGroupsStore = new RecentGroupsStore()
