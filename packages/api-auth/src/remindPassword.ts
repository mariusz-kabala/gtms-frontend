import { makeApiUrl } from '@gtms/api-common'

export interface IRemindPasswordData {
  email: string
}

export const remindPaassReq = (payload: IRemindPasswordData): Promise<void> =>
  fetch(makeApiUrl('auth/remind-password'), {
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
