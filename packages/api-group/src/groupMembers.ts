import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IUser } from '@gtms/commons'

export interface IGroupMembersResponse {
  docs: IUser[]
  total: number
  limit: number
  offset: number
}

export const fetchGroupMembers = (slug: string, offset = 0, limit = 25) =>
  fetchJSON<void, IGroupMembersResponse>(
    makeApiUrl(`groups/${slug}/members?offset=${offset}&limit=${limit}`)
  )
