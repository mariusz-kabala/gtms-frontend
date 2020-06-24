import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IComment } from '@gtms/commons/models'

export interface ICreateCommentData {
  post: string
  text: string
  parent?: string
}

export const createCommentAPI = (
  payload: ICreateCommentData
): Promise<IComment> =>
  fetchJSON<ICreateCommentData, IComment>(makeApiUrl('comments/'), {
    values: payload,
  })
