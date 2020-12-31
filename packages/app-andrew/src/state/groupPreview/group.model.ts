import { IUser, IGroupAvatar, IGroupCover } from '@gtms/commons/models'

export interface IGroupPreviewState {
  isOpen: boolean
  isLoaded: boolean
  isLoading: boolean
  isLoadingMembers: boolean
  errorOccured: boolean
  members?: IUser[]
  name: string
  description?: string
  slug: string
  tags: string[]
  cover?: IGroupCover
  avatar?: IGroupAvatar
}
