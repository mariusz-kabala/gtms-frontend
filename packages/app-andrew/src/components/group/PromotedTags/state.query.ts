import { Observable, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { promotedTagsQuery } from '@gtms/state-tag'
import { groupQuery } from '@gtms/state-group'
import { IPromotedTag } from '@gtms/commons/models'

export interface IPromotedTagsState {
  tags: IPromotedTag[]
  isLoading: boolean
  errorOccured: boolean
  isAdmin: boolean
  id?: string
}

export const promotedTagsState = (): IPromotedTagsState => {
  const promotedTagsState = promotedTagsQuery.getValue()

  return {
    tags: promotedTagsQuery.getAll(),
    isLoading: promotedTagsState.loading || false,
    errorOccured: promotedTagsState.error,
    isAdmin: groupQuery.hasAdminRights(),
    id: groupQuery.getId(),
  }
}

export const promotedTagsState$: Observable<IPromotedTagsState> = combineLatest(
  promotedTagsQuery.selectAll(),
  groupQuery.allState$
).pipe(map(() => promotedTagsState()))
