import { fetchGroupMembers } from '@gtms/api-group'
import { groupMembersStore } from './groupMembers.store'
import { applyTransaction } from '@datorama/akita'

export async function getGroupMembers(
  slug: string,
  requestedOffset = 0,
  requestedLimit = 25
) {
  applyTransaction(() => {
    groupMembersStore.reset()
    groupMembersStore.setError(false)
    groupMembersStore.setLoading(false)
  })

  try {
    const { docs, offset, total } = await fetchGroupMembers(
      slug,
      requestedOffset,
      requestedLimit
    )

    applyTransaction(() => {
      groupMembersStore.upsertMany(docs)
      groupMembersStore.update({
        offset,
        total,
      })
    })
  } catch {
    groupMembersStore.setError(true)
  } finally {
    groupMembersStore.setLoading(false)
  }
}
