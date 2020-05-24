import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { GroupType, GroupVisibility } from '@gtms/commons'

export interface IGroupDetailsResponse {
  id: string
  name: string
  slug: string
  description: string
  type: GroupType
  visibility: GroupVisibility
  avatar?: {
    status: string
    files: string[]
  }
  bg?: {
    status: string
    files: string[]
  }
  tags?: string[]
  members?: string[]
  owner: string
}

export const fetchGroupDetails = (slug: string) => {
  return fetchJSON<null, IGroupDetailsResponse>(makeApiUrl(`groups/${slug}`))
}
