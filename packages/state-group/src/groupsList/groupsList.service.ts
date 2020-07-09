import {
  fetchRecentGroups,
  fetchTaggedGroups,
  IResponseGroup,
  IRecentGroupsResponse,
} from '@gtms/api-group'
import { groupsListStore } from './groupsList.store'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'
import { applyTransaction } from '@datorama/akita'

const parseResponse = (groups: IResponseGroup[]) =>
  groups.map((group) => {
    if (group.avatar?.status === FileStatus.ready) {
      group.avatar.files = parseFiles(group.avatar.files || [])
    }

    return group
  })

export const initGroupsList = (data: IRecentGroupsResponse) => {
  const { docs, limit, offset } = data

  applyTransaction(() => {
    groupsListStore.reset()
    groupsListStore.update({
      limit,
      offset,
      loading: false,
      error: false,
    })
    groupsListStore.upsertMany(parseResponse(docs))
  })
}

export async function getRecentGroups(
  requestedOffset = 0,
  requestedLimit = 10
) {
  applyTransaction(() => {
    groupsListStore.reset()
    groupsListStore.setLoading(true)
  })

  try {
    const { docs } = await fetchRecentGroups(requestedOffset, requestedLimit)

    applyTransaction(() => {
      groupsListStore.upsertMany(parseResponse(docs))
      groupsListStore.setLoading(false)
    })
  } catch {
    applyTransaction(() => {
      groupsListStore.setError(true)
      groupsListStore.setLoading(false)
    })
  }
}

export async function findByTags(
  tags: string[],
  requestedOffset = 0,
  requestedLimit = 25
) {
  applyTransaction(() => {
    groupsListStore.reset()
    groupsListStore.update({
      loading: true,
      limit: requestedLimit,
      offset: requestedOffset,
    })
  })

  try {
    const { docs } = await fetchTaggedGroups(
      tags,
      requestedOffset,
      requestedLimit
    )
    applyTransaction(() => {
      groupsListStore.upsertMany(parseResponse(docs))
      groupsListStore.setLoading(false)
    })
  } catch {
    applyTransaction(() => {
      groupsListStore.setError(true)
      groupsListStore.setLoading(false)
    })
  }
}
