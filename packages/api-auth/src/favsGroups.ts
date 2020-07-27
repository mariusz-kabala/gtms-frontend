import { fetchJSON, makeApiUrl, deleteRequest } from '@gtms/api-common'

export interface IAddGroupToFavsPayload {
  group: string
  order?: number
}

export interface IIsGroupInFavsAPIResponse {
  [id: string]: boolean
}

export const addGroupToFavsAPI = (
  payload: IAddGroupToFavsPayload
): Promise<void> =>
  fetchJSON<IAddGroupToFavsPayload, void>(makeApiUrl('auth/favs/groups'), {
    values: payload,
  })

export const isGroupInFavsAPI = (
  ids: string[]
): Promise<IIsGroupInFavsAPIResponse> => {
  const params = new URLSearchParams()

  for (const id of ids) {
    params.append('id[]', id)
  }

  return fetchJSON<void, IIsGroupInFavsAPIResponse>(
    makeApiUrl(`auth/me/favs/groups/status?${params.toString()}`)
  )
}

export const removeGroupFromFavsAPI = (groupId: string) =>
  deleteRequest(makeApiUrl(`auth/favs/groups/${groupId}`))

export const updateFavGroupsOrderAPI = (payload: string[]) =>
  fetchJSON<string[], void>(makeApiUrl('auth/me/favs/groups'), {
    values: payload,
    method: 'PUT',
  })
