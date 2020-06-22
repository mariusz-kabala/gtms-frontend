import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IUser } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'

interface IResponseUser extends IUser {
  avatar: {
    status: FileStatus
    files: any
  }
}

export interface ITagUsersResponse {
  docs: IResponseUser[]
  total: number
  limit: number
  offset: number
}

export const fetchTaggedUsers = (tags: string[], offset = 0, limit = 10) =>
  fetchJSON<void, ITagUsersResponse>(
    makeApiUrl(
      `auth/users/tag?q=${tags.join(',')}&offset=${offset}&limit=${limit}`
    )
  )
