import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { FileStatus } from '@gtms/commons/enums'

export interface IAccountDetailsResponse {
  id: string
  name?: string
  email: string
  countryCode: string
  languageCode: string
  tags: string[]
  roles: string[]
  username: string
  avatar?: {
    status: FileStatus
    files: string[]
  }
}

export const fetchAccountDetails = () =>
  fetchJSON<null, IAccountDetailsResponse>(makeApiUrl('auth/me'))
