import {
  fetchGroupInvitations,
  deleteGroupInvitationAPI,
} from '@gtms/api-group'
import { groupInvitationsStore } from './groupInvitations.store'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'
import { applyTransaction } from '@datorama/akita'

export async function getGroupInvitations(
  slug: string,
  requestedOffset = 0,
  requestedLimit = 25
) {
  applyTransaction(() => {
    groupInvitationsStore.reset()
    groupInvitationsStore.setError(false)
    groupInvitationsStore.setLoading(false)
  })

  try {
    const { docs, offset, total } = await fetchGroupInvitations(
      slug,
      requestedOffset,
      requestedLimit
    )

    applyTransaction(() => {
      groupInvitationsStore.upsertMany(docs)
      groupInvitationsStore.update({
        offset,
        total,
      })
    })
  } catch {
    groupInvitationsStore.setError(true)
  } finally {
    groupInvitationsStore.setLoading(false)
  }
}

export async function deleteGroupInvitation(id: string) {
  try {
    await deleteGroupInvitationAPI(id)
    groupInvitationsStore.remove((invitation) => invitation.id === id)

    addSuccessNotification('Invitation has been removed')
  } catch {
    addErrorNotification('Can not remove the invitation, try later')
  }
}
