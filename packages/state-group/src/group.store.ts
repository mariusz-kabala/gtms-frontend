import { Store, StoreConfig } from '@datorama/akita'
import { IGroup } from './group.model'

export interface IGroupStore {
  isLoading: boolean
  hasNoAccess: boolean
  notFound: boolean
  errorOccured: boolean
  group: IGroup | null
}
@StoreConfig({ name: 'groups' })
export class GroupsStore extends Store<IGroupStore> {
  constructor() {
    super({
      isLoading: true,
      hasNoAccess: false,
      notFound: false,
      errorOccured: false,
      group: null,
    })
  }
}

export const groupStore = new GroupsStore()
