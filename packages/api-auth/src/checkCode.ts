import { makeApiUrl } from '@gtms/api-common'

export interface ICheckCodeData {
  code: string
}

export const checkCodeReq = (payload: ICheckCodeData): Promise<void> =>
  fetch(makeApiUrl('auth/check-code'), {
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
