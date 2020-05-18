import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IPromotedTag } from '@gtms/commons'

export const fetchPromotedTagsAPI = (
  groupId: string
): Promise<IPromotedTag[]> =>
  fetchJSON<null, IPromotedTag[]>(makeApiUrl(`tags/promoted/group/${groupId}`))
