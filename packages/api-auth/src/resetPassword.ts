import { makeApiUrl } from '@gtms/api-common'

export interface IResetPasswordData {
  code: string
  password: string
}

export const resetPasswordReq = (payload: IResetPasswordData): Promise<void> =>
  fetch(makeApiUrl('auth/reset-password'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-cache',
  }).then((response) => {
    if (!response.ok) {
      throw response
    }
  })
