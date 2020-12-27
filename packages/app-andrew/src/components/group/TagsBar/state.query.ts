import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { IPromotedTag } from '@gtms/commons/models'
import {
  promotedTagsQuery,
  IGroupRecentlyViewedTags,
  recentlyViewedTagsQuery,
  groupFavTagsQuery,
  IGroupFavTags,
} from '@gtms/state-tag'
import { groupQuery } from '@gtms/state-group'

export interface ITagsBarState {
  groupId?: string
  groupSlug?: string
  promoted: {
    isLoaded: boolean
    isLoading: boolean
    errorOccured: boolean
    tags: IPromotedTag[]
  }
  recentlyViewed: IGroupRecentlyViewedTags
  fav: IGroupFavTags
}

export const tagsBarState = (): ITagsBarState => {
  const promotedTagsState = promotedTagsQuery.getValue()
  const groupId = groupQuery.getId()

  return {
    groupId,
    groupSlug: groupQuery.getSlug(),
    promoted: {
      isLoaded: promotedTagsState.isLoaded || false,
      isLoading: promotedTagsState.loading || false,
      errorOccured: promotedTagsState.error,
      tags: promotedTagsQuery.getAll(),
    },
    recentlyViewed: groupId
      ? recentlyViewedTagsQuery.getForGroup(groupId)
      : {
          isLoading: false,
          isLoaded: false,
          errorOccured: false,
          tags: [],
        },
    fav: groupId
      ? groupFavTagsQuery.getForGroup(groupId)
      : {
          isLoading: false,
          isLoaded: false,
          errorOccured: false,
          tags: [],
        },
  }
}

export const tagsBarState$: Observable<ITagsBarState> = combineLatest([
  groupFavTagsQuery.allState$,
  promotedTagsQuery.selectAll(),
  recentlyViewedTagsQuery.select(),
]).pipe(map(() => tagsBarState()))
