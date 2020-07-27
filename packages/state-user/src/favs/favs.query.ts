import { Query } from '@datorama/akita'
import { IFavsStore, FavGroupsStore, myFavGroupsStore } from './favs.store'

export class FavsQuery extends Query<IFavsStore> {
  constructor(protected store: FavGroupsStore) {
    super(store)
  }
}

export const favGroupsQuery = new FavsQuery(myFavGroupsStore)
