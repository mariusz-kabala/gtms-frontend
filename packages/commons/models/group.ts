import { GroupType, GroupVisibility, FileStatus } from '../enums'

export interface IGroupAvatar {
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

export interface IGroupBg {
  status: FileStatus
  files: {
    '200x200'?: {
      jpg: string
      webp: string
    }
  }
}

export interface IGroup {
  id: string
  name: string
  slug: string
  description?: string
  type: GroupType
  visibility: GroupVisibility
  avatar?: IGroupAvatar
  bg?: IGroupBg
  tags?: string[]
  owner: string
  membersCounter: number
  postsCounter: number
}
