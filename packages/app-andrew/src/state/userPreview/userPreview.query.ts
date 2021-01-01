import { Query } from '@datorama/akita'
import { IUserPreviewState } from './userPreview.model'
import { UserPreviewStore, userPreviewStore } from './userPreview.store'

export class UserPreviewQuery extends Query<IUserPreviewState> {
  constructor(protected store: UserPreviewStore) {
    super(store)
  }
}

export const userPreviewQuery = new UserPreviewQuery(userPreviewStore)
