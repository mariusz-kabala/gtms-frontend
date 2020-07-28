import { fetchJSON, makeApiUrl, deleteRequest } from '@gtms/api-common'
import { IUser } from '@gtms/commons'

export const addPostToFavs = (id: string): Promise<void> =>
  fetchJSON(makeApiUrl(`posts/${id}/favs`), {
    method: 'POST',
  })

export const removeFromFavs = (id: string): Promise<unknown> =>
  deleteRequest(makeApiUrl(`posts/${id}/favs`))

export const getPostFavs = (id: string): Promise<IUser[]> =>
  fetchJSON<void, IUser[]>(makeApiUrl(`posts/${id}/favs`))
