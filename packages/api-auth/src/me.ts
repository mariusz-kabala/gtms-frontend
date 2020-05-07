import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export const fetchAccountDetails = () => fetchJSON(makeApiUrl('/auth/me'))
