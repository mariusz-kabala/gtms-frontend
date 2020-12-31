import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IPost, IGroup } from '@gtms/commons/models'

export interface IMyPostsResponse {
  docs: IPost[]
  total: number
  limit: number
  offset: number
}

export interface IMyPostsRequest {
  limit: number
  offset: number
  groups?: string[]
}

export interface IMyPostsDetailsResponse extends IGroup {
  count: number
}

export const fetchMyPosts = (payload: IMyPostsRequest) => {
  return fetchJSON<IMyPostsRequest, IMyPostsResponse>(makeApiUrl('posts/my'), {
    values: payload,
  })
}

export const fetchMyPostDetails = () =>
  fetchJSON<void, IMyPostsDetailsResponse[]>(makeApiUrl('posts/my/details'))
