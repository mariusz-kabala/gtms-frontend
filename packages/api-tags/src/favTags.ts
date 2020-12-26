import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IFavTag } from '@gtms/commons/models'

export interface IAddTagToFavsPayload {
  tag: string
  group: string
  type: string
}

export const addTagToFavsAPI = (
  payload: IAddTagToFavsPayload
): Promise<void> => {
  return fetchJSON<IAddTagToFavsPayload, void>(makeApiUrl('tags/favs'), {
    values: payload,
  })
}

export const fetchGroupFavTagsAPI = (groupId: string) =>
  fetchJSON<void, IFavTag[]>(makeApiUrl(`tags/favs/group/${groupId}`))
