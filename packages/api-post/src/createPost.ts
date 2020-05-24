import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IPost } from '@gtms/commons/models'

export interface ICreatePostData {
  group: string
  text: string
  tags?: string[]
}

export const createPostAPI = (payload: ICreatePostData): Promise<IPost> =>
  fetchJSON<ICreatePostData, IPost>(makeApiUrl('posts/'), {
    values: payload,
  })
