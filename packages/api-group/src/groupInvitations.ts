import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IGroupInvitation } from '@gtms/commons/models'

export interface IGroupInvitationsResponse {
  docs: IGroupInvitation[]
  total: number
  limit: number
  offset: number
}

export const fetchGroupInvitations = (slug: string, offset = 0, limit = 25) =>
  fetchJSON<void, IGroupInvitationsResponse>(
    makeApiUrl(`groups/${slug}/invitations?offset=${offset}&limit=${limit}`)
  )
