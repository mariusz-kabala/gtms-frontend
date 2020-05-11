import { Store, StoreConfig } from '@datorama/akita'
import { IMyGroups } from './myGroups.model'

export type IMyGroupsStore = IMyGroups & {
  isLoading: boolean
  errorOccurred: boolean
  isLoaded: boolean
}

@StoreConfig({ name: 'myGroups' })
export class MyGroupsStore extends Store<IMyGroupsStore> {
  constructor() {
    super(
      {
        isLoading: false,
        errorOccurred: false,
        isLoaded: false,
      },
      {
        resettable: true,
      }
    )
  }
}

export const myGroupsStore = new MyGroupsStore()
