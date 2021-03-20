import { fetchPost } from '@gtms/api-post'
import { fetchPostComments } from '@gtms/api-comment'
import { postDetailsStore } from './postDetails.store'
import { Status } from './postDetails.model'

export function showPostDetailsModal(id: string) {
  postDetailsStore.update({
    isOpen: true,
    status: Status.isLoading,
    commentsStatus: Status.isLoading,
    post: undefined,
    comments: undefined,
  })

  Promise.all([fetchPost(id), fetchPostComments(id)])
    .then(([post, comments]) => {
      postDetailsStore.update({
        isOpen: true,
        status: Status.isLoaded,
        commentsStatus: Status.isLoaded,
        post,
        comments,
      })
    })
    .catch(() => {
      postDetailsStore.update({
        isOpen: true,
        status: Status.isError,
        commentsStatus: Status.isError,
        post: undefined,
        comments: undefined,
      })
    })
}
