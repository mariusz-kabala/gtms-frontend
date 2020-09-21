import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IAbuseCreateData {
  reason: string
  substantiation?: string
  post?: string
  comment?: string
}

export const createAbuseReportAPI = (
  payload: IAbuseCreateData
): Promise<void> =>
  fetchJSON<IAbuseCreateData, void>(makeApiUrl('abuses/'), {
    values: payload,
  })
