import {
  fetchRecentUsers,
  IResponseUser,
  fetchTaggedUsers,
  IRecentUsersResponse,
  ITagUsersResponse,
} from '@gtms/api-auth'
import { usersListStore } from './usersList.store'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'

const parseResponse = (users: IResponseUser[]) =>
  users.map((user) => {
    if (user.avatar?.status === FileStatus.ready) {
      user.avatar.files = parseFiles(user.avatar?.files || [])
    }

    return user
  })

export const initUsersList = (
  data: IRecentUsersResponse | ITagUsersResponse
) => {
  usersListStore.reset()

  const { docs, limit, offset } = data

  usersListStore.update({
    limit,
    offset,
    loading: false,
    error: false,
  })
  usersListStore.upsertMany(parseResponse(docs))
}

export async function getRecentUsers(requestedOffset = 0, requestedLimit = 10) {
  usersListStore.reset()
  usersListStore.setLoading(true)

  try {
    const { docs } = await fetchRecentUsers(requestedOffset, requestedLimit)

    usersListStore.upsertMany(parseResponse(docs))
  } catch (err) {
    usersListStore.setError(true)
  } finally {
    usersListStore.setLoading(false)
  }
}

export async function findByTags(
  tags: string[],
  requestedOffset = 0,
  requestedLimit = 25
) {
  usersListStore.reset()
  usersListStore.update({
    loading: true,
    limit: requestedLimit,
    offset: requestedOffset,
  })

  try {
    const { docs } = await fetchTaggedUsers(
      tags,
      requestedOffset,
      requestedLimit
    )
    usersListStore.upsertMany(parseResponse(docs))
  } catch {
    usersListStore.setError(true)
  } finally {
    usersListStore.setLoading(false)
  }
}
