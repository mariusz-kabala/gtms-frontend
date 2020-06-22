import {
  fetchRecentGroups,
  fetchTaggedGroups,
  IResponseGroup,
  IRecentGroupsResponse,
} from '@gtms/api-group'
import { groupsListStore } from './groupsList.store'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'

const parseResponse = (groups: IResponseGroup[]) =>
  groups.map((group) => {
    if (group.avatar?.status === FileStatus.ready) {
      group.avatar.files = parseFiles(group.avatar.files || [])
    }

    return group
  })

export const initGroupsList = (data: IRecentGroupsResponse) => {
  groupsListStore.reset()

  const { docs, limit, offset } = data

  groupsListStore.update({
    limit,
    offset,
    loading: false,
    error: false,
  })
  groupsListStore.upsertMany(parseResponse(docs))
}

export async function getRecentGroups(
  requestedOffset = 0,
  requestedLimit = 10
) {
  groupsListStore.reset()
  groupsListStore.setLoading(true)

  try {
    const { docs } = await fetchRecentGroups(requestedOffset, requestedLimit)

    groupsListStore.upsertMany(parseResponse(docs))
  } catch {
    groupsListStore.setError(true)
  } finally {
    groupsListStore.setLoading(false)
  }
}

export async function findByTags(
  tags: string[],
  requestedOffset = 0,
  requestedLimit = 25
) {
  groupsListStore.reset()
  groupsListStore.update({
    loading: true,
    limit: requestedLimit,
    offset: requestedOffset,
  })

  try {
    const { docs } = await fetchTaggedGroups(
      tags,
      requestedOffset,
      requestedLimit
    )
    groupsListStore.upsertMany(parseResponse(docs))
  } catch {
    groupsListStore.setError(true)
  } finally {
    groupsListStore.setLoading(false)
  }
}
