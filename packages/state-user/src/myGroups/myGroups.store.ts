import { Store } from '@datorama/akita'
import { IMyGroups } from './myGroups.model'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'
import { IGroup } from '@gtms/commons/models'

export type IMyGroupsStore = IMyGroups & {
  isLoading: boolean
  errorOccurred: boolean
  isLoaded: boolean
}

const parseGroupAvatars = (group: IGroup) => {
  if (
    Array.isArray(group.avatar?.files) &&
    group.avatar?.status === FileStatus.ready
  ) {
    group.avatar.files = parseFiles(group.avatar.files)
  }

  return group
}

export class MyGroupsStore extends Store<IMyGroupsStore> {
  constructor() {
    super(
      {
        isLoading: false,
        errorOccurred: false,
        isLoaded: false,
        admin: [],
        owner: [],
        member: [],
        favs: {
          docs: [],
          limit: -1,
          offset: -1,
          total: -1,
        },
      },
      {
        resettable: true,
        name: 'myGroups',
      }
    )
  }

  akitaPreUpdate = (_: IMyGroupsStore, nextState: IMyGroupsStore) => {
    const { admin, owner, member, favs: { docs } = {} } = nextState

    nextState.admin = admin.map(parseGroupAvatars)
    nextState.member = member.map(parseGroupAvatars)
    nextState.owner = owner.map(parseGroupAvatars)
    nextState.favs = {
      ...nextState.favs,
      docs: (docs ?? []).map(parseGroupAvatars),
    }

    return nextState
  }
}

export const myGroupsStore = new MyGroupsStore()
