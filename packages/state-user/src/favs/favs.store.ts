import { Store } from '@datorama/akita'

export interface IFavsStore {
  isLoading: boolean
  errorOccurred: boolean
  data: {
    [key: string]: {
      lastCheck: number
      isInFavs: boolean
    }
  }
}

export class FavGroupsStore extends Store<IFavsStore> {
  constructor(name = 'favs') {
    super(
      {
        isLoading: false,
        errorOccurred: false,
        data: {},
      },
      {
        name,
      }
    )
  }
}

export const myFavGroupsStore = new FavGroupsStore('favGroups')
