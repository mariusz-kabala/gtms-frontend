import { makeApiUrl } from '@gtms/api-common'

export const uploadPromotedTagLogo = (id: string, file: File) => {
  const data = new FormData()
  data.append('relatedRecord', id)
  data.append('file', file)

  return fetch(makeApiUrl(`files/tags/promoted`), {
    method: 'POST',
    body: data,
  }).then((res) => {
    if (res.status !== 201) {
      throw res
    }
  })
}
