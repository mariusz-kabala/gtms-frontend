import { QueryEntity } from '@datorama/akita'
import {
  IPromotedTagsState,
  PromotedTagsStore,
  promotedTagsStore,
} from './promotedTags.store'

export class PromotedTagsQuery extends QueryEntity<IPromotedTagsState> {
  constructor(protected store: PromotedTagsStore) {
    super(store)
  }
}

export const promotedTagsQuery = new PromotedTagsQuery(promotedTagsStore)
