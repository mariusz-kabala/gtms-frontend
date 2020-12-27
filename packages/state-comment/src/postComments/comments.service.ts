import { fetchPostComments } from '@gtms/api-comment'
import { postCommentsStore, IPostCommentsState } from './comments.store'
import { postCommentsQuery } from './comments.query'
import { ICreateCommentData, createCommentAPI } from '@gtms/api-comment'
import { userQuery } from '@gtms/state-user'
import { addPostCommentIfNeeded } from '@gtms/state-post'
import { IComment, ISubComment } from '@gtms/commons/models'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'
import { applyTransaction } from '@datorama/akita'

const parseCommentsOwnersAvatar = (comment: IComment) => {
  return comment
}

export const getPostComments = async (
  postId: string,
  requestedOffset = 0,
  requestedLimit = 50
) => {
  applyTransaction(() => {
    postCommentsStore.reset()
    postCommentsStore.setLoading(false)
    postCommentsStore.setError(false)
  })

  try {
    const { docs, total, offset } = await fetchPostComments(
      postId,
      requestedOffset,
      requestedLimit
    )

    applyTransaction(() => {
      postCommentsStore.upsertMany(docs.map(parseCommentsOwnersAvatar))
      postCommentsStore.update({
        offset,
        total,
      })
    })
  } catch {}
}

export const initPostCommentsStore = (state: IPostCommentsState) => {
  postCommentsStore.update(state)
}

export const createNewComment = async (payload: ICreateCommentData) => {
  try {
    const comment = await createCommentAPI(payload)

    addSuccessNotification(`Comment has been created!`)

    if (!payload.parent) {
      comment.owner = userQuery.accountDetails()
      postCommentsStore.upsert(comment.id, comment)
      addPostCommentIfNeeded(payload.post, comment)
    } else if (postCommentsQuery.hasEntity(payload.parent)) {
      const parentComment = postCommentsQuery.getEntity(payload.parent)

      const subComments = (parentComment && parentComment.subComments) || []
      const newComment = {
        ...comment.subComments.pop(),
        owner: userQuery.accountDetails(),
      } as ISubComment

      postCommentsStore.upsert(payload.parent, {
        subComments: [...subComments, newComment],
      })
    }
  } catch {
    addErrorNotification('Error occured, try again later')
  }
}
