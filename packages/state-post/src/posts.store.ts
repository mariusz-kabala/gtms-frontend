import { EntityState, EntityStore } from '@datorama/akita'
import { IPost, IPostImage } from '@gtms/commons/models'
import { parsePostOwnersAvatar } from './helpers'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'
import { Sorting } from '@gtms/api-post'

export interface IPostsState extends EntityState<IPost, string> {
  offset: number
  total: number
  tags: string[]
  users: string[]
  sort: Sorting
  limit: number
}

export class PostsStore extends EntityStore<IPostsState> {
  constructor() {
    super(
      {
        offset: 0,
        limit: 50,
        total: -1,
        sort: Sorting.latest,
        tags: [],
        users: [],
      },
      {
        name: 'posts',
        resettable: true,
      }
    )
  }

  akitaPreAddEntity = (post: IPost) => {
    post = parsePostOwnersAvatar(post)

    if (Array.isArray(post.images)) {
      post.images = post.images
        .map((img) => {
          if (img.status !== FileStatus.ready) {
            return null
          }

          if (Array.isArray(img.files)) {
            img.files = parseFiles(img.files)
          }

          return img
        })
        .filter((img) => img) as IPostImage[]
    }

    return post
  }
}

export const postsStore = new PostsStore()
