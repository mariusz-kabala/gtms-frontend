import { EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { IGroup } from './group.model'

export type IGroupStore = EntityState<IGroup, number>

@StoreConfig({ name: 'groups' })
export class GroupsStore extends EntityStore<IGroupStore> {
  constructor() {
    super()
  }
}

export const groupStore = new GroupsStore()
