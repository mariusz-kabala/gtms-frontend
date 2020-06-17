import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IUser, IGroup } from '@gtms/commons/models'

export interface IUserDetailsResponse extends IUser {
  groupsMember: IGroup[]
  groupsAdmin: IGroup[]
  groupsOwner: IGroup[]
}

export const fetchUserDetails = (id: string) =>
  fetchJSON<null, IUserDetailsResponse>(makeApiUrl(`auth/users/${id}`))
