import {
  IGroupCreateData,
  createGroupAPI,
  IGroupCreateResponse,
  fetchGroupDetails,
  updateGroupAPI,
  IGroupData,
} from '@gtms/api-group'
import { groupStore, IGroupStore } from './group.store'
import { IGroup } from './group.model'
import { GroupType, GroupVisibility } from '@gtms/commons'

export const createNewGroup = async (payload: {
  name: string
  description?: string
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
    const group = (await fetchGroupDetails(slug)) as IGroup

    groupStore.update({
      isLoading: false,
      group,
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
  const group = (await updateGroupAPI(data, slug)) as IGroup

  groupStore.update({
    group,
  })
}
