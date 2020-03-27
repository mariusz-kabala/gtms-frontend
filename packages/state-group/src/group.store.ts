import { EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { IGroup } from './group.model'

@StoreConfig({ name: 'groups' })
export class GroupsStore extends EntityStore<EntityState<IGroup, number>> {
  constructor() {
    super()
  }
}
