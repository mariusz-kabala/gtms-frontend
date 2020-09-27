import { Sorting } from '@gtms/api-post'
import { onlyUnique } from '@gtms/commons/helpers'

interface ISearchURLParams {
  sort?: Sorting
  post?: string
  user?: string | string[]
  tag?: string | string[]
  page?: string | number
}

export function generateSearchURL(
  baseURL: string,
  params: ISearchURLParams,
  defaults?: ISearchURLParams
): string {
  let { sort, user, tag } = params
  const { page, post } = params

  if (defaults) {
    sort = sort || defaults.sort
    user = user || defaults.user
    tag = tag || defaults.tag
  }

  let url = baseURL

  if (page) {
    url += `/page/${page}`
  }

  if (
    (typeof user === 'string' && user !== '') ||
    (Array.isArray(user) && user.length > 0)
  ) {
    url += `/user/${
      Array.isArray(user) ? user.filter(onlyUnique).join('/') : user
    }`
  }

  if (sort) {
    url += `/sort/${sort}`
  }

  if (
    (typeof tag === 'string' && tag !== '') ||
    (Array.isArray(tag) && tag.length > 0)
  ) {
    url += `/tag/${Array.isArray(tag) ? tag.filter(onlyUnique).join('/') : tag}`
  }

  if (post) {
    url += `/post/${post}`
  }

  return url
}
