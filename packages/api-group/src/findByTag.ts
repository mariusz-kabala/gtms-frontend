import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IGroup } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'

interface IResponseGroup extends IGroup {
  avatar: {
    status: FileStatus
    files: any
  }
}

export interface ITagGroupsResponse {
  docs: IResponseGroup[]
  total: number
  limit: number
  offset: number
}

export const fetchTaggedGroups = (tags: string[], offset = 0, limit = 10) =>
  fetchJSON<void, ITagGroupsResponse>(
    makeApiUrl(`groups/tag?q=${tags.join(',')}&offset=${offset}&limit=${limit}`)
  )
