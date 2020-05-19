import { EntityState, EntityStore } from '@datorama/akita'
import { IPromotedTag } from '@gtms/commons/models'

export type PromotedTagsState = EntityState<IPromotedTag, number>

export class PromotedTagsStore extends EntityStore<PromotedTagsState> {
  constructor() {
    super(undefined, {
      name: 'promotedTags',
    })
  }
}

export const promotedTagsStore = new PromotedTagsStore()
