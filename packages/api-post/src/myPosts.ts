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
  tags?: string[]
}

export interface IMyPostsDetailsResponse extends IGroup {
  count: number
}

export const fetchMyPosts = (payload: IMyPostsRequest) => {
  return fetchJSON<IMyPostsRequest, IMyPostsResponse>(makeApiUrl('posts/my'), {
    values: payload,
  })
}

export const fetchMyPostDetails = (signal?: AbortSignal) =>
  fetchJSON<void, IMyPostsDetailsResponse[]>(makeApiUrl('posts/my/details'), {
    signal,
  })
