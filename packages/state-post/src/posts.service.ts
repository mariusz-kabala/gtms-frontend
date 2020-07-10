import { ICreatePostData, createPostAPI, fetchGroupPosts } from '@gtms/api-post'
import { ICreateCommentData, createCommentAPI } from '@gtms/api-comment'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'
import { IPost, IComment } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { postsStore, IPostsState } from './posts.store'
import { postsQuery } from './posts.query'
import { parseFiles } from '@gtms/commons/helpers'
import { userQuery } from '@gtms/state-user'
import { applyTransaction } from '@datorama/akita'

const POST_FIRST_COMMENTS_LIMIT = 5

const parsePostOwnersAvatar = (post: IPost) => {
  if (
    Array.isArray(post.owner?.avatar?.files) &&
    post.owner?.avatar?.status === FileStatus.ready
  ) {
    post.owner.avatar.files = parseFiles(post.owner.avatar.files)
  }

  if (Array.isArray(post.firstComments)) {
    post.firstComments = post.firstComments.map((comment) => {
      if (
        Array.isArray(comment.owner?.avatar?.files) &&
        comment.owner?.avatar?.status === FileStatus.ready
      ) {
        comment.owner.avatar.files = parseFiles(comment.owner.avatar.files)
      }

      return comment
    })
  }

  return post
}

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

export const getGroupPosts = async (
  group: string,
  requestedOffset = 0,
  requestedLimit = 50,
  tags: string[] = []
) => {
  applyTransaction(() => {
    postsStore.reset()
    postsStore.setLoading(true)
    postsStore.setError(false)
  })

  try {
    const { docs, total, offset } = await fetchGroupPosts(
      group,
      requestedOffset,
      requestedLimit,
      tags
    )

    applyTransaction(() => {
      postsStore.upsertMany(docs.map(parsePostOwnersAvatar))
      postsStore.update({
        offset,
        total,
        tags,
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

  const firstComments = post.firstComments || []

  if (firstComments.length < POST_FIRST_COMMENTS_LIMIT) {
    postsStore.upsert(postId, {
      firstComments: [...firstComments, comment],
    })
  }
}
