import { makeApiUrl, deleteRequest } from '@gtms/api-common'

export const deleteGroupInvitationAPI = (id: string) =>
  deleteRequest(makeApiUrl(`groups/invitations/${id}`))
