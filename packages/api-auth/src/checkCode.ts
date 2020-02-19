import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface ICheckCodeData {
  code: string
}

export const checkCodeReq = (payload: ICheckCodeData): Promise<{}> =>
  fetchJSON<ICheckCodeData, {}>(makeApiUrl('auth/check-code'), {
    values: payload,
  })
