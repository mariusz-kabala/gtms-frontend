import { groupFavTagsStore } from './favTags.store'
import { groupFavTagsQuery } from './favTags.query'
import {
  addTagToFavsAPI,
  fetchGroupFavTagsAPI,
  deleteGroupFavTagAPI,
} from '@gtms/api-tags'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'
import { IPromotedTag, IFavTag } from '@gtms/commons/models'
import { FavTagType } from '@gtms/commons/enums'

export async function addTagToFavs(tag: IPromotedTag, groupId: string) {
  try {
    const result = await addTagToFavsAPI({
      tag: tag.id,
      group: groupId,
      type: FavTagType.groupTag,
    })

    const groupState = groupFavTagsQuery.getForGroup(groupId)

    groupState.tags.push({
      ...result,
      groupTag: tag,
    } as IFavTag)

    groupFavTagsStore.update({
      [groupId]: {
        ...groupState,
      },
    })

    addSuccessNotification('Tag has been added to your favs!')
  } catch {
    addErrorNotification('Error occured, please try again later')
  }
}

export async function deleteFavTag(tag: IPromotedTag, groupId: string) {
  const groupState = groupFavTagsQuery.getForGroup(groupId)

  const index = groupState.tags.findIndex((t) => t.groupTag.tag === tag.tag)

  if (index > -1) {
    try {
      await deleteGroupFavTagAPI(groupState.tags[index].id)
    } catch {
      addErrorNotification('Error occured, please try again later')
      return
    }
    groupState.tags.splice(index, 1)

    groupFavTagsStore.update({
      [groupId]: {
        ...groupState,
      },
    })

    addSuccessNotification('Tag has been removed from your favs')
  }
}

export async function loadGroupFavTags(groupId: string) {
  if (groupFavTagsQuery.getForGroup(groupId).isLoaded) {
    return
  }

  groupFavTagsStore.update((state) => ({
    ...state,
    [groupId]: {
      isLoading: true,
      isLoaded: false,
      errorOccured: false,
      tags: [],
    },
  }))

  try {
    const favTags = await fetchGroupFavTagsAPI(groupId)

    groupFavTagsStore.update({
      [groupId]: {
        isLoading: false,
        isLoaded: true,
        errorOccured: false,
        tags: favTags,
      },
    })
  } catch {
    groupFavTagsStore.update({
      [groupId]: {
        isLoading: false,
        isLoaded: false,
        errorOccured: true,
        tags: [],
      },
    })
  }
}
