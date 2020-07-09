import { EntityState, EntityStore } from '@datorama/akita'
import { IPromotedTag } from '@gtms/commons/models'

export type IPromotedTagsState = EntityState<IPromotedTag, string>

export class PromotedTagsStore extends EntityStore<IPromotedTagsState> {
  constructor() {
    super(undefined, {
      name: 'promotedTags',
      resettable: true,
    })
  }
}

export const promotedTagsStore = new PromotedTagsStore()
