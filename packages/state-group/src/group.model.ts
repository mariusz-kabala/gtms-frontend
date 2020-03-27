import { GroupType, GroupVisibility } from '@gtms/commons'

export interface IGroup {
  _id: string
  name: string
  slug: string
  description?: string
  type: GroupType
  visibility: GroupVisibility
  avatar?: string
  tags?: string[]
  members?: string[]
  owner: string
}
