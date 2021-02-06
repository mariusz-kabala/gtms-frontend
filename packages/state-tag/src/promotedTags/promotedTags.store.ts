import { EntityState, EntityStore } from '@datorama/akita'
import { IPromotedTag } from '@gtms/commons/models'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'

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

  private parseFiles(tag: IPromotedTag): IPromotedTag {
    if (
      tag.logo?.status === FileStatus.ready &&
      Array.isArray(tag.logo.files)
    ) {
      tag.logo.files = parseFiles(tag.logo.files)
    }

    return tag
  }

  akitaPreAddEntity = (tag: IPromotedTag) => {
    return this.parseFiles(tag)
  }

  akitaPreUpdateEntity = (tag: IPromotedTag) => {
    return this.parseFiles(tag)
  }
}

export const promotedTagsStore = new PromotedTagsStore()
