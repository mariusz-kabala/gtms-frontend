import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IRecentlyViewedTag } from '@gtms/commons/models'

export interface IRecentlyViewedTagPayload {
  group: string
  tag: string
}

export const fetchRecentlyViewedTags = (
  groupId: string
): Promise<IRecentlyViewedTag[]> =>
  fetchJSON<null, IRecentlyViewedTag[]>(
    makeApiUrl(`tags/recent/group/${groupId}`)
  )

export const saveRecentlyViewedTags = (
  payload: IRecentlyViewedTagPayload
): Promise<void> => {
  return fetchJSON<IRecentlyViewedTagPayload, void>(makeApiUrl('tags/recent'), {
    values: payload,
  })
}
