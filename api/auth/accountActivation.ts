import { fetchJSON, makeApiUrl } from '../index'

export const activateAccount = (code: string): Promise<{}> =>
  fetchJSON<{}, {}>(makeApiUrl(`auth/activate-account/${code}`))
