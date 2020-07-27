import { Store } from '@datorama/akita'

export interface IFavsStore {
  isLoading: boolean
  errorOccured: boolean
  data: {
    [key: string]: {
      lastCheck: string
      isInFavs: boolean
    }
  }
}

export class FavGroupsStore extends Store<IFavsStore> {
  constructor(name = 'favs') {
    super(
      {
        isLoading: false,
        errorOccured: false,
        data: {},
      },
      {
        name,
      }
    )
  }
}

export const myFavGroupsStore = new FavGroupsStore('favGroups')
