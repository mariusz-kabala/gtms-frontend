import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IPost, IGroup } from '@gtms/commons/models'

export interface IMyPostsResponse {
  docs: IPost[]
  total: number
  limit: number
  offset: number
}

export interface IMyPostsDetailsResponse extends IGroup {
  count: number
}

export const fetchMyPosts = ({
  limit,
  offset,
}: {
  limit: number
  offset: number
}) => {
  const params = new URLSearchParams()
  params.set('offset', `${offset}`)
  params.set('limit', `${limit}`)

  return fetchJSON<void, IMyPostsResponse>(
    makeApiUrl(`posts/my?${params.toString()}`)
  )
}

export const fetchMyPostDetails = () =>
  fetchJSON<void, IMyPostsDetailsResponse[]>(makeApiUrl('posts/my/details'))
