import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IGroup } from '@gtms/commons/models'

export interface IRecentGroupsResponse {
  docs: IGroup[]
  total: number
  limit: number
  offset: number
}

export const fetchRecentGroups = (offset = 0, limit = 10) =>
  fetchJSON<void, IRecentGroupsResponse>(
    makeApiUrl(`groups?offset=${offset}&limit=${limit}`)
  )
