import { fetchJSON, makeApiUrl, deleteRequest } from '@gtms/api-common'
import { IFavTag } from '@gtms/commons/models'

export interface IAddTagToFavsPayload {
  tag: string
  group: string
  type: string
}

export const addTagToFavsAPI = (
  payload: IAddTagToFavsPayload
): Promise<Partial<IFavTag>> => {
  return fetchJSON<IAddTagToFavsPayload, Partial<IFavTag>>(
    makeApiUrl('tags/favs'),
    {
      values: payload,
    }
  )
}

export const fetchGroupFavTagsAPI = (groupId: string) =>
  fetchJSON<void, IFavTag[]>(makeApiUrl(`tags/favs/group/${groupId}`))

export const deleteGroupFavTagAPI = (id: string) =>
  deleteRequest(makeApiUrl(`tags/favs/${id}`))
