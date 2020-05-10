import {
  IGroupCreateData,
  createGroupAPI,
  IGroupCreateResponse,
  IGroupDetailsResponse,
  fetchGroupDetails,
  updateGroupAPI,
  IGroupData,
  uploadGroupAvatar,
} from '@gtms/api-group'
import { groupStore, IGroupStore } from './group.store'
import { groupQuery } from './group.query'
import {
  IGroup,
  GroupType,
  GroupVisibility,
  FileStatus,
  parseFiles,
} from '@gtms/commons'

export const createNewGroup = async (payload: {
  name: string
  description?: string
  tags?: string[]
}): Promise<IGroupCreateResponse> => {
  const data: IGroupCreateData = {
    ...payload,
    type: GroupType.default,
    visibility: GroupVisibility.public,
  }

  const response = await createGroupAPI(data)

  return response
}

export const initGroup = (data: IGroupStore) => groupStore.update(data)

export const getGroup = async (slug: string) => {
  groupStore.update({
    isLoading: true,
    hasNoAccess: false,
    notFound: false,
    errorOccured: false,
    group: null,
  })

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
  const group = (await updateGroupAPI(data, slug)) as IGroupDetailsResponse

  if (Array.isArray(group.avatar?.files) && group.avatar?.status === 'ready') {
    group.avatar.files = parseFiles(group.avatar.files)
  }

  groupStore.update({
    group: group as IGroup,
  })
}

export const updateGroupAvatar = async (file: File, id?: string) => {
  if (!id) {
    id = groupQuery.getId()
  }

  if (!id) {
    throw new Error('Group id has to be defined')
  }

  await uploadGroupAvatar(id, file)

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
