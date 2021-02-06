import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface ICreatePromotedTagPayload {
  tag: string
  group: string
  file?: {
    id: string
    url: string
  }
  description: string
}

export interface ICreatePromotedTagResponse {
  id: string
  tag: string
  description: string
  order: number
}

export const createPromotedTagAPI = (payload: ICreatePromotedTagPayload) =>
  fetchJSON<ICreatePromotedTagPayload, ICreatePromotedTagResponse>(
    makeApiUrl('tags/promoted'),
    {
      values: payload,
    }
  )
