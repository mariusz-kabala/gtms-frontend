import { Store } from '@datorama/akita'
import { IGroup } from '@gtms/commons/models'
import { parseFiles } from '@gtms/commons/helpers'
import { FileStatus } from '@gtms/commons/enums'

export interface IGroupState {
  isLoading: boolean
  hasNoAccess: boolean
  notFound: boolean
  errorOccured: boolean
  group: IGroup | null
}

export class GroupsStore extends Store<IGroupState> {
  constructor() {
    super(
      {
        isLoading: true,
        hasNoAccess: false,
        notFound: false,
        errorOccured: false,
        group: null,
      },
      {
        name: 'groups',
      }
    )
  }

  akitaPreUpdate = (_: IGroupState, nextState: IGroupState) => {
    const { group } = nextState

    if (
      group &&
      Array.isArray(group.avatar?.files) &&
      group.avatar?.status === FileStatus.ready
    ) {
      group.avatar.files = parseFiles(group.avatar.files)
    }

    if (
      group &&
      Array.isArray(group.cover?.files) &&
      group.cover?.status === FileStatus.ready
    ) {
      group.cover.files = parseFiles(group.cover.files)
    }

    if (
      group &&
      group.bgType === 'file' &&
      Array.isArray(group.bg?.files) &&
      group.bg?.status === FileStatus.ready
    ) {
      group.bg.files = parseFiles(group.bg.files)
    }

    return nextState
  }
}

export const groupStore = new GroupsStore()
