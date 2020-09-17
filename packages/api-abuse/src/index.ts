import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IAbuseCreateData {
  reason: string
  substantiation?: string
  post?: string
  comment?: string
}
