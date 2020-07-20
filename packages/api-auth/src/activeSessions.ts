import { fetchJSON, makeApiUrl, deleteRequest } from '@gtms/api-common'
import { IActiveSession } from '@gtms/commons/models'

export const fetchActiveSessionsAPI = (): Promise<IActiveSession[]> => {
  return fetchJSON<void, IActiveSession[]>(makeApiUrl('auth/sessions'))
}

export const deleteActiveSessionAPI = (id: string) => {
  return deleteRequest(makeApiUrl(`auth/sessions/${id}`))
}
