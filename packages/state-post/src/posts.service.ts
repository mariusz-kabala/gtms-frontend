import { ICreatePostData, createPostAPI, fetchGroupPosts } from '@gtms/api-post'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'
import { IPost } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { postsStore, IPostsState } from './posts.store'
import { parseFiles } from '@gtms/commons/helpers'

const parsePostOwnersAvatar = (post: IPost) => {
  if (
    Array.isArray(post.owner?.avatar?.files) &&
    post.owner?.avatar?.status === FileStatus.ready
  ) {
    post.owner.avatar.files = parseFiles(post.owner.avatar.files)
  }

  return post
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

export const initPostsStore = (data: IPostsState) => {
  postsStore.update(data)
}

export const getGroupPosts = async (
  group: string,
  requestedOffset = 0,
  requestedLimit = 50
) => {
  postsStore.setLoading(true)
  postsStore.setError(false)

  try {
    const { docs, total, offset } = await fetchGroupPosts(
      group,
      requestedOffset,
      requestedLimit
    )

    postsStore.upsertMany(docs.map(parsePostOwnersAvatar))
    postsStore.update({
      offset,
      total,
    })
  } catch {
    postsStore.setError(true)
  } finally {
    postsStore.setLoading(false)
  }
}
