import { fetchGroupAdmins } from '@gtms/api-group'
import { groupAdminsStore } from './groupAdmins.store'
import { applyTransaction } from '@datorama/akita'

export async function getGroupAdmins(slug: string) {
  applyTransaction(() => {
    groupAdminsStore.reset()
    groupAdminsStore.setError(false)
    groupAdminsStore.setLoading(true)
  })

  try {
    const admins = await fetchGroupAdmins(slug)

    applyTransaction(() => {
      groupAdminsStore.upsertMany(admins)
      groupAdminsStore.setLoading(false)
    })
  } catch {
    applyTransaction(() => {
      groupAdminsStore.setError(true)
      groupAdminsStore.setLoading(false)
    })
  }
}
