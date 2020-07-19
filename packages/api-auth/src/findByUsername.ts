import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export const findbyUsernameAPI = (
  query: string,
  signal?: AbortSignal
): Promise<string[]> =>
  fetchJSON<null, string[]>(makeApiUrl(`auth/username/find?query=${query}`), {
    addJWT: false,
    signal,
  })
