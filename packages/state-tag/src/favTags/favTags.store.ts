import { Store } from '@datorama/akita'
import { IFavTag } from '@gtms/commons/models'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'

export interface IGroupFavTags {
  isLoading: boolean
  isLoaded: boolean
  errorOccured: boolean
  tags: IFavTag[]
}

export interface IFavTagsState {
  [groupId: string]: IGroupFavTags
}

export class GroupFavTagsStore extends Store<IFavTagsState> {
  constructor() {
    super(
      {},
      {
        name: 'groupFavTags',
      }
    )
  }

  akitaPreUpdate = (_: IFavTagsState, nextState: IFavTagsState) => {
    for (const id of Object.keys(nextState)) {
      const group = nextState[id]

      if (!group.isLoading && group.isLoaded) {
        for (const tag of group.tags) {
          if (
            tag.groupTag.logo.status === FileStatus.ready &&
            Array.isArray(tag.groupTag.logo.files)
          ) {
            tag.groupTag.logo.files = parseFiles(tag.groupTag.logo.files)
          }
        }
      }
    }

    return nextState
  }
}

export const groupFavTagsStore = new GroupFavTagsStore()
