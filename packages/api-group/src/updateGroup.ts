import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { GroupCoverType } from '@gtms/commons/enums'
import { IGroupDetailsResponse } from './getGroup'

export interface IGroupData {
  name?: string
  description?: string
  type?: string
  visibility?: string
  tags?: string[]
  slug?: string
  bgType?: string
  coverType?: GroupCoverType
}

export const updateGroupAPI = (
  payload: IGroupData,
  slug: string
): Promise<IGroupDetailsResponse> =>
  fetchJSON<IGroupData, IGroupDetailsResponse>(makeApiUrl(`groups/${slug}`), {
    values: payload,
  })
