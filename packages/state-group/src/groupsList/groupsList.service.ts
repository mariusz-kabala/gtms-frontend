import {
  fetchRecentGroups,
  fetchTaggedGroups,
  IRecentGroupsResponse,
} from '@gtms/api-group'
import { groupsListStore } from './groupsList.store'
import { applyTransaction } from '@datorama/akita'

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
    groupsListStore.upsertMany(docs)
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
      groupsListStore.upsertMany(docs)
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
      groupsListStore.upsertMany(docs)
      groupsListStore.setLoading(false)
    })
  } catch {
    applyTransaction(() => {
      groupsListStore.setError(true)
      groupsListStore.setLoading(false)
    })
  }
}
