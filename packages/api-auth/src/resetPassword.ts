import { fetchJSON, makeApiUrl } from '@gtms/api-common'

export interface IResetPasswordData {
  code: string
  password: string
}

export const resetPasswordReq = (payload: IResetPasswordData): Promise<{}> =>
  fetchJSON<IResetPasswordData, {}>(makeApiUrl('auth/reset-password'), {
    values: payload,
  })
