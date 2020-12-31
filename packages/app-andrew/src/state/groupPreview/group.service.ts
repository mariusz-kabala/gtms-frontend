import { groupPreviewStore } from './group.store'
import { IGroup, IUser } from '@gtms/commons/models'
import { fetchGroupMembers } from '@gtms/api-group'

export function showGroupPreview(group: IGroup, groupMembers?: IUser[]) {
  groupPreviewStore.update({
    isOpen: true,
    isLoaded: true,
    isLoading: false,
    errorOccured: false,
    members: groupMembers ?? [],
    isLoadingMembers: groupMembers ? false : true,
    ...group,
  })

  if (!groupMembers) {
    fetchGroupMembers(group.slug, 0, 6).then(({ docs }) => {
      groupPreviewStore.update({
        isLoadingMembers: false,
        members: docs,
      })
    })
  }
}

export function hideGroupPreview() {
  groupPreviewStore.update({
    isOpen: false,
  })
}
