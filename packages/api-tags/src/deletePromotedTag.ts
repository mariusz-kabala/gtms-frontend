import { makeApiUrl, deleteRequest } from '@gtms/api-common'

export const deletePromotedTagAPI = (id: string) =>
  deleteRequest(makeApiUrl(`tags/promoted/${id}`))
