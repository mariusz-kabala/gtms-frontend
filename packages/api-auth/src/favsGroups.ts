import { fetchJSON, makeApiUrl, deleteRequest } from '@gtms/api-common'
import { userQuery } from '@gtms/state-user'

export interface IAddGroupToFavsPayload {
  group: string
  order?: number
}

export const addGroupToFavsAPI = (
  payload: IAddGroupToFavsPayload
): Promise<void> =>
  fetchJSON<IAddGroupToFavsPayload, void>(makeApiUrl('auth/favs/groups'), {
    values: payload,
  })

export const isGroupInFavsAPI = (
  groupId: string,
  replay = false
): Promise<boolean> =>
  fetch(makeApiUrl(`auth/me/favs/groups/${groupId}`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    if (res.ok) {
      return true
    }

    if (res.status === 404) {
      return false
    }

    if (
      res.status === 401 &&
      replay === false &&
      typeof window !== 'undefined'
    ) {
      await fetch(makeApiUrl('auth/refresh-token'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: userQuery.getRefreshToken() }),
      })

      return await isGroupInFavsAPI(groupId)
    }

    throw new Error('Invalid response')
  })

export const removeGroupFromFavsAPI = (groupId: string) =>
  deleteRequest(makeApiUrl(`auth/favs/groups/${groupId}`))
