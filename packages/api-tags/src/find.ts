import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export const findTagsAPI = (query: string): Promise<string[]> =>
  fetchJSON<null, string[]>(makeApiUrl(`tags/find?query=${query}`), {
    addJWT: false,
  })
