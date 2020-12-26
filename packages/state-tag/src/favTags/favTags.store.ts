import { Store } from '@datorama/akita'
import { IFavTag } from '@gtms/commons/models'

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
}

export const groupFavTagsStore = new GroupFavTagsStore()
