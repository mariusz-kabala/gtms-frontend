import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IGroup } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'

export interface IResponseGroup extends IGroup {
  avatar: {
    status: FileStatus
    files: any
  }
}

export interface IRecentGroupsResponse {
  docs: IResponseGroup[]
  total: number
  limit: number
  offset: number
}

export const fetchRecentGroups = (offset = 0, limit = 10) =>
  fetchJSON<void, IRecentGroupsResponse>(
    makeApiUrl(`groups?offset=${offset}&limit=${limit}`)
  )
