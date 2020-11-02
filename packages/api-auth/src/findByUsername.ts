import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IUser } from '@gtms/commons/models'

export const findbyUsernameAPI = (
  query: string,
  signal?: AbortSignal
): Promise<IUser[]> =>
  fetchJSON<null, IUser[]>(makeApiUrl(`auth/username/find?query=${query}`), {
    addJWT: false,
    signal,
  })
