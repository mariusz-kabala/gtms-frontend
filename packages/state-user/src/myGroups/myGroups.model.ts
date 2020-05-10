import { IGroup } from '@gtms/commons'

export interface IMyGroups {
  admin: IGroup[]
  owner: IGroup[]
  member: IGroup[]
  favs: IGroup[]
}
