import { makeApiUrl } from '@gtms/api-common'

/**
 * to be used when uploading a file for a new promoted tag (without id in DB)
 */
export const uploadTmpPromotedTagLogo = (
  file: File
): Promise<{ url: string; id: string }> => {
  const data = new FormData()
  data.append('file', file)

  return fetch(makeApiUrl('files/tmp/tags/promoted'), {
    method: 'POST',
    body: data,
  }).then(async (res) => {
    if (res.status !== 201) {
      throw res
    }

    return await res.json()
  })
}
