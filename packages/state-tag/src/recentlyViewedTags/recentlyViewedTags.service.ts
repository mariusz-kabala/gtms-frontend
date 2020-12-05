import { userQuery } from '@gtms/state-user'
import { getItem, setItem } from '@gtms/commons/helpers'
import { fetchRecentlyViewedTags, saveRecentlyViewedTags } from '@gtms/api-tags'
import { recentlyViewedTagsQuery } from './recentlyViewedTags.query'
import { recentlyViewedTagsStore } from './recentlyViewedTags.store'

const getLSKey = (groupId: string) => `recently-viewed-${groupId}`

function updateStoreWithNewRecentlyViewedTag(groupId: string, tag: string) {
  const groupRecentTags = recentlyViewedTagsQuery.getForGroup(groupId)

  groupRecentTags.tags.push(tag)

  recentlyViewedTagsStore.update({
    [groupId]: groupRecentTags,
  })
}

function loadRecentlyViewedTagsForAnonymousUser(groupId: string) {
  const lsKey = getLSKey(groupId)
  const lsValue = getItem(lsKey)

  let recentlyViewed: string[] = []

  try {
    recentlyViewed = lsValue && JSON.parse(lsValue)
  } catch {
    recentlyViewed = []
  }

  if (!Array.isArray(recentlyViewed)) {
    recentlyViewed = []
  }

  recentlyViewedTagsStore.update({
    [groupId]: {
      isLoading: false,
      isLoaded: true,
      errorOccured: false,
      tags: recentlyViewed,
    },
  })
}

function loadRecentlyViewedTagsForLoggedUser(groupId: string) {
  recentlyViewedTagsStore.update({
    [groupId]: {
      isLoading: true,
      isLoaded: false,
      errorOccured: false,
      tags: [],
    },
  })

  fetchRecentlyViewedTags(groupId)
    .then((tags: string[]) => {
      recentlyViewedTagsStore.update({
        [groupId]: {
          isLoading: false,
          isLoaded: true,
          errorOccured: false,
          tags,
        },
      })
    })
    .catch(() => {
      recentlyViewedTagsStore.update({
        [groupId]: {
          isLoading: false,
          isLoaded: false,
          errorOccured: true,
          tags: [],
        },
      })
    })
}

function saveForAnonymousUser(groupId: string, tag: string) {
  const lsKey = getLSKey(groupId)
  const lsValue = getItem(lsKey)
  let recentlyViewed: string[] = []

  try {
    recentlyViewed = lsValue && JSON.parse(lsValue)
  } catch {
    recentlyViewed = []
  }

  if (
    recentlyViewed.length > 0 &&
    recentlyViewed[recentlyViewed.length - 1] === tag
  ) {
    return
  }

  recentlyViewed.push(tag)

  setItem(lsKey, JSON.stringify(recentlyViewed))
}

function shouldUpdateRecentlyViewedTags(groupId: string, tag: string) {
  const groupRecentTags = recentlyViewedTagsQuery.getForGroup(groupId)

  return !(
    groupRecentTags.isLoaded === true &&
    groupRecentTags.tags.length > 0 &&
    groupRecentTags.tags[groupRecentTags.tags.length - 1] === tag
  )
}

function saveForLoggedUser(groupId: string, tag: string) {
  saveRecentlyViewedTags({
    groupId,
    tag,
  })
}

export function saveRecentlyViewedTag(groupId: string, tag: string) {
  if (shouldUpdateRecentlyViewedTags(groupId, tag)) {
    updateStoreWithNewRecentlyViewedTag(groupId, tag)
  }

  userQuery.isLogged()
    ? saveForLoggedUser(groupId, tag)
    : saveForAnonymousUser(groupId, tag)
}

export function loadRecentlyViewedTags(groupId: string) {
  userQuery.isLogged()
    ? loadRecentlyViewedTagsForLoggedUser(groupId)
    : loadRecentlyViewedTagsForAnonymousUser(groupId)
}
