import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export const findTagsAPI = (
  query: string,
  signal?: AbortSignal
): Promise<string[]> =>
  fetchJSON<null, string[]>(makeApiUrl(`tags/find?query=${query}`), {
    addJWT: false,
    signal,
  })
