import {
  fetchRecentUsers,
  fetchTaggedUsers,
  IRecentUsersResponse,
  ITagUsersResponse,
} from '@gtms/api-auth'
import { usersListStore } from './usersList.store'
import { applyTransaction } from '@datorama/akita'

export const initUsersList = (
  data: IRecentUsersResponse | ITagUsersResponse
) => {
  const { docs, limit, offset } = data

  applyTransaction(() => {
    usersListStore.reset()
    usersListStore.update({
      limit,
      offset,
      loading: false,
      error: false,
    })
    usersListStore.upsertMany(docs)
  })
}

export async function getRecentUsers(requestedOffset = 0, requestedLimit = 10) {
  usersListStore.reset()
  usersListStore.setLoading(true)

  try {
    const { docs } = await fetchRecentUsers(requestedOffset, requestedLimit)

    applyTransaction(() => {
      usersListStore.upsertMany(docs)
      usersListStore.setLoading(false)
    })
  } catch (err) {
    applyTransaction(() => {
      usersListStore.setError(true)
      usersListStore.setLoading(false)
    })
  }
}

export async function findByTags(
  tags: string[],
  requestedOffset = 0,
  requestedLimit = 25
) {
  applyTransaction(() => {
    usersListStore.reset()
    usersListStore.update({
      loading: true,
      limit: requestedLimit,
      offset: requestedOffset,
    })
  })
  try {
    const { docs } = await fetchTaggedUsers(
      tags,
      requestedOffset,
      requestedLimit
    )
    applyTransaction(() => {
      usersListStore.upsertMany(docs)
      usersListStore.setLoading(false)
    })
  } catch {
    applyTransaction(() => {
      usersListStore.setError(true)
      usersListStore.setLoading(false)
    })
  }
}
