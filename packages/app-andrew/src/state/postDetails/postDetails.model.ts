import { IPost } from '@gtms/commons/models'
import { IPostCommentsResponse } from '@gtms/api-comment'

export enum Status {
  isLoading,
  isLoaded,
  isError,
}

export interface IPostDetailsState {
  isOpen: boolean
  status: Status
  commentsStatus: Status
  post?: IPost
  comments?: IPostCommentsResponse
}
