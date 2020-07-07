import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IComment } from '@gtms/commons/models'

export interface IPostCommentsResponse {
  docs: IComment[]
  total: number
  limit: number
  offset: number
}

export const fetchPostComments = (id: string, offset = 0, limit = 50) =>
  fetchJSON<void, IPostCommentsResponse>(
    makeApiUrl(`comments/post/${id}?offset=${offset}&limit=${limit}`)
  )
