import { groupFavTagsStore } from './favTags.store'
import { addTagToFavsAPI, fetchGroupFavTagsAPI } from '@gtms/api-tags'
import { IPromotedTag } from '@gtms/commons/models'
import { FavTagType } from '@gtms/commons/enums'

export async function addTagToFavs(tag: IPromotedTag, groupId: string) {
  try {
    await addTagToFavsAPI({
      tag: tag.id,
      group: groupId,
      type: FavTagType.groupTag,
    })
  } catch {}
}

export async function loadGroupFavTags(groupId: string) {
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
