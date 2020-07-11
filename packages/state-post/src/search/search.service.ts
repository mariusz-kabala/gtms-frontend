import { findPostsAPI, IFindPostsResponse } from '@gtms/api-post'
import { ISearchQuery, postsSearchStore } from './search.store'
import { parsePostOwnersAvatar } from '../helpers'
import { applyTransaction } from '@datorama/akita'

export function initPostsSearchStore(data: IFindPostsResponse) {
  const { docs, total, offset } = data

  applyTransaction(() => {
    postsSearchStore.reset()
    postsSearchStore.upsertMany(docs.map(parsePostOwnersAvatar))
    postsSearchStore.update({
      offset,
      total,
    })
  })
}

export async function findPosts(
  query: ISearchQuery,
  requestedOffset = 0,
  requestedLimit = 50
) {
  applyTransaction(() => {
    postsSearchStore.reset()
    postsSearchStore.setLoading(true)
  })

  try {
    const { docs, total, offset } = await findPostsAPI(
      query,
      requestedOffset,
      requestedLimit
    )

    applyTransaction(() => {
      postsSearchStore.upsertMany(docs.map(parsePostOwnersAvatar))
      postsSearchStore.update({
        offset,
        total,
      })
      postsSearchStore.setLoading(false)
    })
  } catch (err) {
    applyTransaction(() => {
      postsSearchStore.setLoading(false)
      postsSearchStore.setError(true)
    })
  }
}
