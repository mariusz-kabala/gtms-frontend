import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IGroup } from '@gtms/commons'

export interface IMyGroupsResponse {
  admin: IGroup[]
  owner: IGroup[]
  member: IGroup[]
  favs: {
    limit: number
    total: number
    offset: number
    docs: IGroup[]
  }
}

export const fetchMyGroups = () =>
  fetchJSON<null, IMyGroupsResponse>(makeApiUrl('auth/me/groups'))
