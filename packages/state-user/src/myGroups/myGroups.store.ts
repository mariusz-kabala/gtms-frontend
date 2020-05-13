import { Store } from '@datorama/akita'
import { IMyGroups } from './myGroups.model'

export type IMyGroupsStore = IMyGroups & {
  isLoading: boolean
  errorOccurred: boolean
  isLoaded: boolean
}

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
        name: 'myGroups',
      }
    )
  }
}

export const myGroupsStore = new MyGroupsStore()
