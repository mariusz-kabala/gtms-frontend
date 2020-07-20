import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { ILoginHistory } from '@gtms/commons/models'

export const fetchLoginHistoryAPI = (): Promise<ILoginHistory[]> => {
  return fetchJSON<void, ILoginHistory[]>(makeApiUrl('auth/login-history'))
}
