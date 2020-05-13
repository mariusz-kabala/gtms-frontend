import { makeApiUrl } from '@gtms/api-common'

export const joinGroupAPI = (slug: string) =>
  fetch(makeApiUrl(`groups/${slug}/join`))

export const leaveGroupAPI = (slug: string) =>
  fetch(makeApiUrl(`groups/${slug}/leave`))
