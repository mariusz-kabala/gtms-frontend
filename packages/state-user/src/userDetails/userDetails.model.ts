import { IUser, IGroup } from '@gtms/commons'

export interface IUserDetailsState extends IUser {
  groupsMember: IGroup[]
  groupsAdmin: IGroup[]
  groupsOwner: IGroup[]
}
