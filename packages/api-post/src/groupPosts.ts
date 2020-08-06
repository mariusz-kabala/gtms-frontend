import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IPost } from '@gtms/commons/models'

export enum Sorting {
  popular = 'popular',
  latest = 'latest',
  active = 'active',
}

export interface IGroupPostsResponse {
  docs: IPost[]
  total: number
  limit: number
  offset: number
}

export const fetchGroupPosts = ({
  group,
  offset = 0,
  limit = 50,
  tags = [],
  users = [],
  sort = Sorting.latest,
}: {
  group: string
  offset?: number
  limit?: number
  tags?: string[]
  users?: string[]
  sort?: Sorting
}) => {
  const params = new URLSearchParams()
  params.set('offset', `${offset}`)
  params.set('limit', `${limit}`)
  params.set('sort', sort)

  if (tags.length > 0) {
    for (const tag of tags) {
      params.append('tags[]', tag)
    }
  }

  if (users.length > 0) {
    for (const user of users) {
      params.append('users[]', user)
    }
  }

  return fetchJSON<void, IGroupPostsResponse>(
    makeApiUrl(`posts/group/${group}?${params.toString()}`)
  )
}
