import { fetchJSON, makeApiUrl } from '../index'

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
