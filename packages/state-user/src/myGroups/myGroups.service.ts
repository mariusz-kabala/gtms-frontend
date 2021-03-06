import {
  fetchMyGroups,
  addGroupToFavsAPI,
  removeGroupFromFavsAPI,
  updateFavGroupsOrderAPI,
} from '@gtms/api-auth'
import { joinGroupAPI, leaveGroupAPI } from '@gtms/api-group'
import { myGroupsStore } from './myGroups.store'
import { myFavGroupsStore } from '../favs/favs.store'
import { IGroup } from '@gtms/commons/models'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'

export const markMyGroupsAsLoading = () =>
  myGroupsStore.update({
    isLoading: true,
    errorOccurred: false,
    isLoaded: false,
  })

export const loadMyGroups = async (force = false) => {
  if (!force && myGroupsStore.getValue().isLoading === true) {
    return
  }

  myGroupsStore.update({
    isLoading: true,
    errorOccurred: false,
    isLoaded: false,
  })

  try {
    const myGroups = await fetchMyGroups()

    myGroupsStore.update({
      ...myGroups,
      isLoaded: true,
      isLoading: false,
    })
  } catch (err) {
    myGroupsStore.update({
      errorOccurred: true,
      isLoading: false,
    })
  }
}

export const initGroups = ({
  admin,
  member,
  owner,
}: {
  admin: IGroup[]
  member: IGroup[]
  owner: IGroup[]
}) => {
  myGroupsStore.update({
    isLoading: false,
    isLoaded: true,
    errorOccurred: false,
    admin,
    member,
    owner,
  })
}

export const addToFavs = (group: IGroup) => {
  const favs = myGroupsStore.getValue().favs || []

  addGroupToFavsAPI({
    group: group.id,
  })
    .then(() => {
      addSuccessNotification('Group has been added to your favs')
    })
    .catch(() => {
      favs.docs.pop()

      myGroupsStore.update({
        favs: {
          ...favs,
        },
      })

      addErrorNotification('Error occured, can not add group to favs')
    })

  const favsData = { ...myFavGroupsStore.getValue().data }

  favsData[group.id] = {
    isInFavs: true,
    lastCheck: new Date().getTime(),
  }

  myFavGroupsStore.update({
    data: favsData,
  })

  if (favs.docs.some((g) => g.id === group.id)) {
    return
  }

  favs.docs.push(group)

  myGroupsStore.update({
    favs: {
      ...favs,
      total: favs.total + 1,
    },
  })
}

export const removeFromFavs = (group: IGroup) => {
  const favs = myGroupsStore.getValue().favs || []
  const index = favs.docs.findIndex((g) => g.id === group.id)

  removeGroupFromFavsAPI(group.id)
    .then(() => {
      addSuccessNotification('Group has been removed to your favs')
    })
    .catch(() => {
      addErrorNotification('Error occured, can not delete group from favs')
    })

  const favsData = { ...myFavGroupsStore.getValue().data }

  favsData[group.id] = {
    isInFavs: false,
    lastCheck: new Date().getTime(),
  }

  myFavGroupsStore.update({
    data: favsData,
  })

  if (index === -1) {
    return
  }

  favs.docs.splice(index, 1)

  myGroupsStore.update({
    favs: {
      ...favs,
      total: favs.total - 1,
    },
  })
}

export const joinGroup = async (group: IGroup) => {
  const groupMember: IGroup[] = myGroupsStore.getValue().member || []

  if (groupMember.some((g) => g.id === group.id)) {
    return
  }

  try {
    await joinGroupAPI(group.slug)

    addSuccessNotification(`You have joined ${group.name}!`)

    groupMember.push(group)

    myGroupsStore.update({
      member: [...groupMember],
    })
  } catch {
    addErrorNotification(
      `Error occured, you can not join this group now. Try later`
    )
  }
}

export const leaveGroup = async (group: IGroup) => {
  const groupMember: IGroup[] = myGroupsStore.getValue().member || []
  const index = groupMember.findIndex((g) => g.id === group.id)

  if (index === -1) {
    return
  }

  try {
    await leaveGroupAPI(group.slug)

    addSuccessNotification(`You successfully left ${group.name}!`)

    groupMember.splice(index, 1)

    myGroupsStore.update({
      member: [...groupMember],
    })
  } catch {
    addErrorNotification(
      `Error occured, you can not leave this group now. Try later`
    )
  }
}

export const updateFavGroupsOrder = async (
  groups: string[],
  reloadMyGroups = true
) => {
  try {
    await updateFavGroupsOrderAPI(groups)
  } catch {
    return
  }

  reloadMyGroups && loadMyGroups()
}
