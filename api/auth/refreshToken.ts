import { fetchJSON, makeApiUrl } from 'api'

export interface IRefreshTokenData {
  token: string
}

export interface IRefreshTokenResponse {
  accessToken: string
}

export const fetchNewToken = (
  payload: IRefreshTokenData
): Promise<IRefreshTokenResponse> =>
  fetchJSON<IRefreshTokenData, IRefreshTokenResponse>(
    makeApiUrl('auth/refresh-token'),
    { values: payload }
  )
