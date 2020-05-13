import { fetchRecentUsers } from '@gtms/api-auth'
import { recentUsersStore } from './recentUsers.store'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'

export async function getRecentUsers(requestedOffset = 0, requestedLimit = 10) {
  recentUsersStore.setLoading(true)
  recentUsersStore.setError(false)

  try {
    const { docs } = await fetchRecentUsers(requestedOffset, requestedLimit)

    recentUsersStore.upsertMany(
      docs.map((user) => {
        if (user.avatar?.status === FileStatus.ready) {
          user.avatar.files = parseFiles(user.avatar?.files || [])
        }

        return user
      })
    )
  } catch (err) {
    recentUsersStore.setError(true)
  } finally {
    recentUsersStore.setLoading(false)
  }
}
