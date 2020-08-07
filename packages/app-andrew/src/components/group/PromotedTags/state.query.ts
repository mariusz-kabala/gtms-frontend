import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { promotedTagsQuery } from '@gtms/state-tag'
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
}

export const promotedTagsState = (): IPromotedTagsState => {
  const promotedTagsState = promotedTagsQuery.getValue()

  return {
    tags: promotedTagsQuery.getAll(),
    activeTags: postsQuery.getValue().tags || [],
    isLoading: promotedTagsState.loading || false,
    errorOccured: promotedTagsState.error,
    isAdmin: groupQuery.hasAdminRights(),
    id: groupQuery.getId(),
  }
}

export const promotedTagsState$: Observable<IPromotedTagsState> = combineLatest(
  promotedTagsQuery.selectAll(),
  postsQuery.selectAll(),
  groupQuery.allState$
).pipe(map(() => promotedTagsState()))
