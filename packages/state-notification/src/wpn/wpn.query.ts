import { Query } from '@datorama/akita'
import { IWPNState, wpnStore, WPNStore } from './wpn.store'

export class WPNQuery extends Query<IWPNState> {
  constructor(protected store: WPNStore) {
    super(store)
  }
}

export const wpnQuery = new WPNQuery(wpnStore)
