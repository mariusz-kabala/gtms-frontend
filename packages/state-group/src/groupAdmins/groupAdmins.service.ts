import { fetchGroupAdmins } from '@gtms/api-group'
import { groupAdminsStore } from './groupAdmins.store'

export async function getGroupAdmins(slug: string) {
  groupAdminsStore.setError(false)
  groupAdminsStore.setLoading(true)

  try {
    const admins = await fetchGroupAdmins(slug)

    groupAdminsStore.upsertMany(admins)
  } catch {
    groupAdminsStore.setError(true)
  } finally {
    groupAdminsStore.setLoading(false)
  }
}
