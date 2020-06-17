import { fetchMyGroups } from '@gtms/api-auth'
import { joinGroupAPI, leaveGroupAPI } from '@gtms/api-group'
import { myGroupsStore } from './myGroups.store'
import { parseFiles, IGroup, FileStatus } from '@gtms/commons'
import {
  addSuccessNotification,
  addErrorNotification,
} from '@gtms/state-notification'

const parseGroupAvatars = (group: IGroup) => {
  if (
    Array.isArray(group.avatar?.files) &&
    group.avatar?.status === FileStatus.ready
  ) {
    group.avatar.files = parseFiles(group.avatar.files)
  }

  return group
}

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

    myGroups.admin = myGroups.admin.map(parseGroupAvatars)
    myGroups.member = myGroups.member.map(parseGroupAvatars)
    myGroups.owner = myGroups.owner.map(parseGroupAvatars)

    myGroupsStore.update({
      ...myGroups,
      isLoaded: true,
    })
  } catch (err) {
    myGroupsStore.update({
      errorOccurred: true,
    })
  } finally {
    myGroupsStore.update({
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

  if (favs.some((g) => g.id === group.id)) {
    return
  }

  favs.push(group)

  myGroupsStore.update({
    favs: [...favs],
  })

  addSuccessNotification('Group has been added to your favs')
}

export const removeFromFavs = (group: IGroup) => {
  const favs = myGroupsStore.getValue().favs || []

  const index = favs.findIndex((g) => g.id === group.id)

  if (index === -1) {
    return
  }

  favs.splice(index, 1)

  addSuccessNotification('Group has been removed to your favs')

  myGroupsStore.update({
    favs: [...favs],
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
