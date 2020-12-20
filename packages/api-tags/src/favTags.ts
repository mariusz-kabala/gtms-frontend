import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IAddTagToFavsPayload {
  tag: string
  group: string
  type: string
}

export const addTagToFavs = (payload: IAddTagToFavsPayload): Promise<void> => {
  return fetchJSON<IAddTagToFavsPayload, void>(makeApiUrl('tag/favs'), {
    values: payload,
  })
}
