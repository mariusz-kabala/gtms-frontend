import { GroupType, GroupVisibility, FileStatus } from '../enums'

export interface IGroup {
  id: string
  name: string
  slug: string
  description?: string
  type: GroupType
  visibility: GroupVisibility
  avatar?: {
    status: FileStatus
    files: {
      '35x35'?: {
        jpg: string
        webp: string
      }
      '50x50'?: {
        jpg: string
        webp: string
      }
      '200x200'?: {
        jpg: string
        webp: string
      }
    }
  }
  bg?: {
    status: FileStatus
    files: string[]
  }
  tags?: string[]
  members?: string[]
  owner: string
}
