import { makeApiUrl } from '@gtms/api-common'

export const uploadPostImage = (file: File) => {
  const data = new FormData()
  data.append('file', file)

  return fetch(makeApiUrl(`files/posts/image`), {
    method: 'POST',
    body: data,
  }).then(async (res) => {
    if (res.status !== 201) {
      throw res
    }

    return await res.json()
  })
}
