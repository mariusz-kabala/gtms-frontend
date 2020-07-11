import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IPost } from '@gtms/commons/models'

export interface IFindPostsResponse {
  docs: IPost[]
  total: number
  limit: number
  offset: number
}

export const findPostsAPI = (
  query: {
    tags?: string[]
  },
  offset = 0,
  limit = 50
) => {
  const params = new URLSearchParams()
  params.set('offset', `${offset}`)
  params.set('limit', `${limit}`)

  if (Array.isArray(query.tags) && query.tags.length > 0) {
    for (const tag of query.tags) {
      params.append('tags[]', tag)
    }
  }

  return fetchJSON<void, IFindPostsResponse>(
    makeApiUrl(`posts/find?${params.toString()}`)
  )
}
