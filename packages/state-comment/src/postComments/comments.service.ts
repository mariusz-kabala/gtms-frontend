import { fetchPostComments } from '@gtms/api-comment'
import { postCommentsStore, IPostCommentsState } from './comments.store'
import { IComment } from '@gtms/commons/models'

const parseCommentsOwnersAvatar = (comment: IComment) => {
  return comment
}

export const getPostComments = async (
  postId: string,
  requestedOffset = 0,
  requestedLimit = 50
) => {
  postCommentsStore.setLoading(false)
  postCommentsStore.setError(false)

  try {
    const { docs, total, offset } = await fetchPostComments(
      postId,
      requestedOffset,
      requestedLimit
    )

    postCommentsStore.upsertMany(docs.map(parseCommentsOwnersAvatar))
    postCommentsStore.update({
      offset,
      total,
    })
  } catch {}
}

export const initPostCommentsStore = (state: IPostCommentsState) => {
  postCommentsStore.update(state)
}
