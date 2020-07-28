import { isGroupInFavsAPI } from '@gtms/api-auth'
import { favGroupsQuery } from './favs.query'
import { myFavGroupsStore } from './favs.store'

export async function checkGroupsFavStatus(groups: string[]) {
  const value = favGroupsQuery.getValue()
  if (value.isLoading) {
    return
  }

  const toRefresh = favGroupsQuery.getOutdatedData(groups)

  if (toRefresh.length === 0) {
    return
  }

  myFavGroupsStore.update({
    isLoading: true,
    errorOccurred: false,
  })

  try {
    const result = await isGroupInFavsAPI(toRefresh)
    const now = new Date().getTime()
    const data = { ...value.data }

    for (const id of Object.keys(result)) {
      data[id] = {
        lastCheck: now,
        isInFavs: result[id],
      }
    }

    myFavGroupsStore.update({
      isLoading: false,
      errorOccurred: false,
      data,
    })
  } catch {
    myFavGroupsStore.update({
      isLoading: false,
      errorOccurred: true,
    })
  }
}
