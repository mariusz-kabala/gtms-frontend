import { fetchRecentGroups } from '@gtms/api-group'
import { recentGroupsStore } from './recentGroups.store'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'

export async function getRecentGroups(
  requestedOffset = 0,
  requestedLimit = 10
) {
  recentGroupsStore.setLoading(true)
  recentGroupsStore.setError(false)

  try {
    const { docs } = await fetchRecentGroups(requestedOffset, requestedLimit)

    recentGroupsStore.upsertMany(
      docs.map((group) => {
        if (group.avatar?.status === FileStatus.ready) {
          group.avatar.files = parseFiles(group.avatar.files || [])
        }

        return group
      })
    )
  } catch (err) {
    recentGroupsStore.setError(true)
  } finally {
    recentGroupsStore.setLoading(false)
  }
}
