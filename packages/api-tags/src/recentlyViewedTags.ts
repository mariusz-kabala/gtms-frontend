import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IRecentlyViewedTagPayload {
  groupId: string
  tag: string
}

export const fetchRecentlyViewedTags = (groupId: string): Promise<string[]> =>
  fetchJSON<null, string[]>(makeApiUrl(`tags/recent/group/${groupId}`))

export const saveRecentlyViewedTags = (
  payload: IRecentlyViewedTagPayload
): Promise<void> => {
  return fetchJSON<IRecentlyViewedTagPayload, void>(makeApiUrl('tags/recent'), {
    values: payload,
  })
}
