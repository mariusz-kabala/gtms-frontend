import { Query } from '@datorama/akita'
import { IGroupPreviewState } from './group.model'
import { GroupPreviewStore, groupPreviewStore } from './group.store'

export class GroupPreviewQuery extends Query<IGroupPreviewState> {
  constructor(protected store: GroupPreviewStore) {
    super(store)
  }
}

export const groupPreviewQuery = new GroupPreviewQuery(groupPreviewStore)
