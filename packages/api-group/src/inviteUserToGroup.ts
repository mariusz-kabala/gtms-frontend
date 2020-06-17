import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IInvitationData {
  user: string
  description?: string
}

export const inviteToGroupAPI = (
  payload: IInvitationData,
  slug: string
): Promise<null> =>
  fetchJSON<IInvitationData, null>(makeApiUrl(`groups/${slug}/invitations`), {
    values: payload,
  })
