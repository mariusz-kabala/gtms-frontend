import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IUpdatePromotedTagPayload {
  description: string
  order?: number
}

export interface IUpdatePromotedTagResponse {
  id: string
  tag: string
  description: string
  order: number
}

export const updatePromotedTagAPI = (
  id: string,
  payload: IUpdatePromotedTagPayload
) =>
  fetchJSON<IUpdatePromotedTagPayload, IUpdatePromotedTagResponse>(
    makeApiUrl(`tags/promoted/${id}`),
    {
      values: payload,
    }
  )
