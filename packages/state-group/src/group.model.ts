import { GroupType, GroupVisibility } from '@gtms/commons'

export interface IGroup {
  id: string
  name: string
  slug: string
  description?: string
  type: GroupType
  visibility: GroupVisibility
  avatar?: {
    type: string
    files: string[]
  }
  bg?: {
    type: string
    files: string[]
  }
  tags?: string[]
  members?: string[]
  owner: string
}
