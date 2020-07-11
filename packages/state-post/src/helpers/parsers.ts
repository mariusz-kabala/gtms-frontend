import { IPost } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { parseFiles } from '@gtms/commons/helpers'

export const parsePostOwnersAvatar = (post: IPost) => {
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
