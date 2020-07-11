import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IPost } from '@gtms/commons/models'

export interface IGroupPostsResponse {
  docs: IPost[]
  total: number
  limit: number
  offset: number
}

export const fetchGroupPosts = (
  group: string,
  offset = 0,
  limit = 50,
  tags: string[] = []
) => {
  const params = new URLSearchParams()
  params.set('offset', `${offset}`)
  params.set('limit', `${limit}`)

  if (tags.length > 0) {
    for (const tag of tags) {
      params.append('tags[]', tag)
    }
  }

  return fetchJSON<void, IGroupPostsResponse>(
    makeApiUrl(`posts/group/${group}?${params.toString()}`)
  )
}
