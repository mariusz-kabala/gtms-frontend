import {
  ICreatePostData,
  createPostAPI,
  fetchGroupPosts,
  Sorting,
} from '@gtms/api-post'
import { ICreateCommentData, createCommentAPI } from '@gtms/api-comment'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'
import { IPost, IComment } from '@gtms/commons/models'
import { postsStore, IPostsState } from './posts.store'
import { postsQuery } from './posts.query'
import { userQuery } from '@gtms/state-user'
import { applyTransaction } from '@datorama/akita'

const POST_FIRST_COMMENTS_LIMIT = 5

export const createNewComment = async (payload: ICreateCommentData) => {
  try {
    const comment = await createCommentAPI(payload)

    addSuccessNotification(`Comment has been created!`)

    const post = postsQuery.getEntity(payload.post)

    comment.owner = userQuery.accountDetails()

    if (post) {
      const firstComments = !Array.isArray(post.firstComments)
        ? []
        : [...post.firstComments]

      firstComments.push(comment)

      postsStore.upsert(payload.post, { firstComments })
    }
  } catch {
    addErrorNotification('Error occured, try again later')
  }
}

export const createNewPost = async (payload: ICreatePostData) => {
  try {
    const post = await createPostAPI(payload)

    addSuccessNotification(`Post has been created!`)

    postsStore.add(post)
  } catch {
    addErrorNotification('Error occured, try again later')
  }
}

export const initPostsStore = (data: IPostsState, post?: IPost) => {
  postsStore.update(data)

  if (post) {
    postsStore.setActive(post.id)
  }
}

export const getGroupPosts = async ({
  group,
  requestedOffset = 0,
  requestedLimit = 50,
  users = [],
  tags = [],
  sort = Sorting.latest,
}: {
  group: string
  requestedOffset?: number
  requestedLimit?: number
  users?: string[]
  tags?: string[]
  sort?: Sorting
}) => {
  applyTransaction(() => {
    postsStore.reset()
    postsStore.setLoading(true)
    postsStore.setError(false)
    postsStore.update({
      sort,
    })
  })

  try {
    const { docs, total, offset } = await fetchGroupPosts({
      group,
      offset: requestedOffset,
      limit: requestedLimit,
      tags,
      sort,
      users,
    })

    applyTransaction(() => {
      postsStore.upsertMany(docs)
      postsStore.update({
        offset,
        total,
        tags,
        users,
        limit: requestedLimit,
      })
    })
  } catch {
    postsStore.setError(true)
  } finally {
    postsStore.setLoading(false)
  }
}

export const addPostCommentIfNeeded = (postId: string, comment: IComment) => {
  if (!postsQuery.hasEntity(postId)) {
    return
  }

  const post = postsQuery.getEntity(postId)

  const firstComments = (post && post.firstComments) || []

  if (firstComments.length < POST_FIRST_COMMENTS_LIMIT) {
    postsStore.upsert(postId, {
      firstComments: [...firstComments, comment],
    })
  }
}
