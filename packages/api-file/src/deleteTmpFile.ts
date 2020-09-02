import { makeApiUrl, deleteRequest } from '@gtms/api-common'

export const deleteTmpFileAPI = (id: string) =>
  deleteRequest(makeApiUrl(`files/tmp/${id}`))
