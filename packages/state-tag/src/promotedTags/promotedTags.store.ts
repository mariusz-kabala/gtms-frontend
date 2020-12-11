import { EntityState, EntityStore } from '@datorama/akita'
import { IPromotedTag } from '@gtms/commons/models'

export interface IPromotedTagsState extends EntityState<IPromotedTag, string> {
  isLoaded: boolean
}

export class PromotedTagsStore extends EntityStore<IPromotedTagsState> {
  constructor() {
    super(
      {
        loading: false,
        isLoaded: false,
      },
      {
        name: 'promotedTags',
        resettable: true,
      }
    )
  }
}

export const promotedTagsStore = new PromotedTagsStore()
