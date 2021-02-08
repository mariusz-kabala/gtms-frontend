import { userPreviewStore } from './userPreview.store'
import { IUser } from '@gtms/commons/models'

export function showUserPreview(user: IUser) {
  userPreviewStore.update({
    isOpen: true,
    isLoaded: true,
    isLoading: false,
    errorOccured: false,
    user,
  })
}

export function hideUserPreview() {
  userPreviewStore.update({
    isOpen: false,
  })
}
