import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IAccountDetailsResponse {
  id: string
  name?: string
  email: string
  countryCode: string
  languageCode: string
  tags: string[]
  roles: string[]
}

export const fetchAccountDetails = () =>
  fetchJSON<null, IAccountDetailsResponse>(makeApiUrl('auth/me'))
