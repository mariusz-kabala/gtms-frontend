import { fetchJSON, makeApiUrl } from '@gtms/api-common'
import { IUser } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'

export interface IResponseUser extends IUser {
  avatar: {
    status: FileStatus
    files: any
  }
}

export interface IRecentUsersResponse {
  docs: IResponseUser[]
  total: number
  limit: number
  offset: number
}

export const fetchRecentUsers = (offset = 0, limit = 10) =>
  fetchJSON<void, IRecentUsersResponse>(
    makeApiUrl(`auth/users?offset=${offset}&limit=${limit}`)
  )
