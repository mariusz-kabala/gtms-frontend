import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IUser } from '@gtms/commons'

export const fetchGroupAdmins = (slug: string) =>
  fetchJSON<void, IUser[]>(makeApiUrl(`groups/${slug}/admins`))
