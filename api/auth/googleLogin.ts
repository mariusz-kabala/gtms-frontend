import { fetchJSON, makeApiUrl } from '../index'

export interface IGoogleLoginData {
  accessToken: string
  id: string
}

export interface IGoogleLoginResponse {
  accessToken: string
  refreshToken: string
}

export const googleLogin = (
  payload: IGoogleLoginData
): Promise<IGoogleLoginResponse> =>
  fetchJSON<IGoogleLoginData, IGoogleLoginResponse>(makeApiUrl('auth/google'), {
    values: payload,
  })
