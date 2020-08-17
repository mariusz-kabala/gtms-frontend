import {
  GroupType,
  GroupVisibility,
  FileStatus,
  GroupCoverType,
} from '../enums'
import { IImage } from '../types/image'

export interface IGroupAvatar {
  status: FileStatus
  files: {
    '35x35'?: IImage
    '50x50'?: IImage
    '200x200'?: IImage
  }
}

export interface IGroupBg {
  status: FileStatus
  files: {
    '200x200'?: IImage
  }
}

export interface IGroupCover {
  // proper type is needed here
  status: FileStatus
  files: {
    '200x200'?: IImage
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
  bgType: string
  cover: IGroupCover
  coverType: GroupCoverType
}
