import { fetchMyGroups } from '@gtms/api-auth'
import { myGroupsStore } from './myGroups.store'
import { parseFiles, IGroup, FileStatus } from '@gtms/commons'

const parseGroupAvatars = (group: IGroup) => {
  if (
    Array.isArray(group.avatar?.files) &&
    group.avatar?.status === FileStatus.ready
  ) {
    group.avatar.files = parseFiles(group.avatar.files)
  }

  return group
}

export const loadMyGroups = async () => {
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
}

export const removeFromFavs = (group: IGroup) => {
  const favs = myGroupsStore.getValue().favs || []

  const index = favs.findIndex((g) => g.id === group.id)

  if (index === -1) {
    return
  }

  favs.splice(index, 1)

  myGroupsStore.update({
    favs: [...favs],
  })
}
