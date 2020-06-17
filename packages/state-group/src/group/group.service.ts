import {
  IGroupCreateData,
  createGroupAPI,
  IGroupCreateResponse,
  IGroupDetailsResponse,
  fetchGroupDetails,
  updateGroupAPI,
  IGroupData,
  uploadGroupAvatar,
  IInvitationData,
  inviteToGroupAPI,
} from '@gtms/api-group'
import { groupStore, IGroupState } from './group.store'
import { groupQuery } from './group.query'
import {
  IGroup,
  GroupType,
  GroupVisibility,
  FileStatus,
  parseFiles,
} from '@gtms/commons'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'

export const createNewGroup = async (payload: {
  name: string
  description?: string
  tags?: string[]
}): Promise<IGroupCreateResponse> => {
  const data: IGroupCreateData = {
    ...payload,
    type: GroupType.public,
    visibility: GroupVisibility.public,
  }

  const response = await createGroupAPI(data)

  addSuccessNotification(`Your new group is ready!`)

  return response
}

export const initGroup = (data: IGroupState) => groupStore.update(data)

export const markAsLoading = () =>
  groupStore.update({
    isLoading: true,
    hasNoAccess: false,
    notFound: false,
    errorOccured: false,
    group: null,
  })

export const getGroup = async (slug: string) => {
  markAsLoading()

  try {
    const group = (await fetchGroupDetails(slug)) as IGroupDetailsResponse

    if (
      Array.isArray(group.avatar?.files) &&
      group.avatar?.status === FileStatus.ready
    ) {
      group.avatar.files = parseFiles(group.avatar.files)
    }

    groupStore.update({
      isLoading: false,
      group: group as IGroup,
    })
  } catch (res) {
    switch (res.status) {
      case 401:
        groupStore.update({
          isLoading: false,
          hasNoAccess: true,
        })
        break

      case 404:
        groupStore.update({
          isLoading: false,
          notFound: true,
        })
        break

      default:
        groupStore.update({
          isLoading: false,
          errorOccured: true,
        })
        break
    }
  }
}

export const updateGroup = async (data: IGroupData, slug: string) => {
  try {
    const group = (await updateGroupAPI(data, slug)) as IGroupDetailsResponse

    addSuccessNotification(`Group settings has been updated`)

    if (
      Array.isArray(group.avatar?.files) &&
      group.avatar?.status === 'ready'
    ) {
      group.avatar.files = parseFiles(group.avatar.files)
    }

    groupStore.update({
      group: group as IGroup,
    })
  } catch {
    addErrorNotification('Error occured, try again later')
  }
}

export const updateGroupAvatar = async (file: File, id?: string) => {
  if (!id) {
    id = groupQuery.getId()
  }

  if (!id) {
    throw new Error('Group id has to be defined')
  }

  try {
    await uploadGroupAvatar(id, file)
    addSuccessNotification(`Group's avatar has been updated`)
  } catch {
    addErrorNotification('Error occured, try again later')
    return
  }

  const group = groupStore.getValue().group as IGroup

  if (!group.avatar) {
    group.avatar = {
      status: FileStatus.uploaded,
      files: {},
    }
  }

  group.avatar.status = FileStatus.uploaded

  groupStore.update((value) => ({
    ...value,
    group,
  }))

  setTimeout(() => {
    getGroup(group.slug)
  }, 2500)
}

export const inviteToGroup = (payload: IInvitationData, slug: string) => {
  return inviteToGroupAPI(payload, slug)
    .then(() => {
      addSuccessNotification('Invitation has been sent')
    })
    .catch(() => {
      addErrorNotification(
        'Can not send the invitation right now, please try later'
      )
    })
}
