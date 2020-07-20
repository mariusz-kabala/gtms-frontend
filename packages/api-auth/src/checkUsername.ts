import { makeApiUrl } from '@gtms/api-common'

export const checkUsernameAPI = (username: string): Promise<boolean> =>
  fetch(makeApiUrl('auth/users/username'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  }).then((res) => {
    if (res.ok) {
      return true
    }

    if (res.status === 404) {
      return false
    }

    throw new Error('Invalid response')
  })
