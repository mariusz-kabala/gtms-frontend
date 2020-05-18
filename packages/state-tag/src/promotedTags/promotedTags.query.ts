import { QueryEntity } from '@datorama/akita'
import {
  PromotedTagsState,
  PromotedTagsStore,
  promotedTagsStore,
} from './promotedTags.store'

export class PromotedTagsQuery extends QueryEntity<PromotedTagsState> {
  constructor(protected store: PromotedTagsStore) {
    super(store)
  }
}

export const promotedTagsQuery = new PromotedTagsQuery(promotedTagsStore)
