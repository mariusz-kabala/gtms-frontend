import { fetchGroupMembers } from '@gtms/api-group'
import { groupMembersStore } from './groupMembers.store'

export async function getGroupmembers(
  slug: string,
  requestedOffset = 0,
  requestedLimit = 25
) {
  groupMembersStore.setError(false)
  groupMembersStore.setLoading(false)

  try {
    const { docs, offset, total } = await fetchGroupMembers(
      slug,
      requestedOffset,
      requestedLimit
    )

    groupMembersStore.upsertMany(docs)
    groupMembersStore.update({
      offset,
      total,
    })
  } catch {
    groupMembersStore.setError(true)
  } finally {
    groupMembersStore.setLoading(false)
  }
}
