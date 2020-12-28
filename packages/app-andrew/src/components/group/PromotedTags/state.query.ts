import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { promotedTagsQuery, groupFavTagsQuery } from '@gtms/state-tag'
import { postsQuery } from '@gtms/state-post'
import { groupQuery } from '@gtms/state-group'
import { IPromotedTag } from '@gtms/commons/models'

export interface IPromotedTagsState {
  tags: IPromotedTag[]
  activeTags?: string[]
  isLoading: boolean
  errorOccured: boolean
  isAdmin: boolean
  id?: string
  favTags: string[]
}

export const promotedTagsState = (): IPromotedTagsState => {
  const promotedTagsState = promotedTagsQuery.getValue()
  const id = groupQuery.getId()

  return {
    tags: promotedTagsQuery.getAll(),
    activeTags: postsQuery.getValue().tags || [],
    isLoading: promotedTagsState.loading || false,
    errorOccured: promotedTagsState.error,
    isAdmin: groupQuery.hasAdminRights(),
    id,
    favTags: id
      ? groupFavTagsQuery.getForGroup(id).tags.map((t) => t.groupTag.tag)
      : [],
  }
}

export const promotedTagsState$: Observable<IPromotedTagsState> = combineLatest(
  [
    promotedTagsQuery.selectAll(),
    postsQuery.selectAll(),
    groupQuery.allState$,
    groupFavTagsQuery.allState$,
  ]
).pipe(map(() => promotedTagsState()))
