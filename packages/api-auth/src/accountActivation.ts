import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export const activateAccount = (code: string): Promise<{}> =>
  fetchJSON<{}, {}>(makeApiUrl(`auth/activate-account/${code}`))
