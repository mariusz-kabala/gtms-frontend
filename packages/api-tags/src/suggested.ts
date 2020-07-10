import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export const fetchSuggestedTagsAPI = (tags: string[]): Promise<string[]> =>
  fetchJSON<{ tags: string[] }, string[]>(makeApiUrl('tags/suggested'), {
    values: { tags },
  })
