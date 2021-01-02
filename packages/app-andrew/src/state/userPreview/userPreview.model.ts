import { IUser } from '@gtms/commons/models'

export interface IUserPreviewState {
  isOpen: boolean
  isLoaded: boolean
  isLoading: boolean
  errorOccured: boolean
  user?: IUser
}
