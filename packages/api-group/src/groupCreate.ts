import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { GroupType, GroupVisibility } from '@gtms/commons'

export interface IGroupCreateData {
  name: string
  description: string
  type: GroupType
  visibility: GroupVisibility
}

export interface IGroupCreateResponse {
  id: string
  name: string
  slug: string
  description: string
  type: GroupType
  visibility: GroupVisibility
  avatar: string
  tags: string[]
  members: string[]
}

export const createGroupAPI = (
  payload: IGroupCreateData
): Promise<IGroupCreateResponse> =>
  fetchJSON<IGroupCreateData, IGroupCreateResponse>(makeApiUrl('groups/'), {
    values: payload,
  })
