import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IAccountDetailsResponse } from './me'

export interface IAccountUpdatePayload {
  name?: string
  email?: string
  countryCode?: string
  languageCode?: string
  tags?: string[]
}

export const updateAccountAPI = (
  payload: IAccountUpdatePayload
): Promise<IAccountDetailsResponse> =>
  fetchJSON<IAccountUpdatePayload, IAccountDetailsResponse>(
    makeApiUrl('auth/me'),
    { values: payload }
  )
