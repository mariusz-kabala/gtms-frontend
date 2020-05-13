import { fetchRecentGroups } from '@gtms/api-group'
import { recentGroupsStore } from './recentGroups.store'

export async function getRecentGroups(
  requestedOffset = 0,
  requestedLimit = 10
) {
  recentGroupsStore.setLoading(true)
  recentGroupsStore.setError(false)

  try {
    const { docs } = await fetchRecentGroups(requestedOffset, requestedLimit)

    recentGroupsStore.upsertMany(docs)
  } catch (err) {
    recentGroupsStore.setError(true)
  } finally {
    recentGroupsStore.setLoading(false)
  }
}
