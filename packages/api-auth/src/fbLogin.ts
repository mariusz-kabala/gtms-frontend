import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IFbLoginData {
  accessToken: string
  id: string
}

export interface IFbLoginResponse {
  accessToken: string
  refreshToken: string
}

export const fbLogin = (payload: IFbLoginData): Promise<IFbLoginResponse> =>
  fetchJSON<IFbLoginData, IFbLoginResponse>(makeApiUrl('auth/facebook'), {
    values: payload,
  })
