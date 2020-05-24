import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IPost } from '@gtms/commons/models'

export interface IGroupPostsResponse {
  docs: IPost[]
  total: number
  limit: number
  offset: number
}

export const fetchGroupPosts = (group: string, offset = 0, limit = 50) =>
  fetchJSON<void, IGroupPostsResponse>(
    makeApiUrl(`posts/group/${group}?offset=${offset}&limit=${limit}`)
  )
