import { QueryEntity } from '@datorama/akita'
import {
  GroupAdminsState,
  GroupAdminsStore,
  groupAdminsStore,
} from './groupAdmins.store'
import { Observable } from 'rxjs'
import { IUser } from '@gtms/commons/models'

export interface IGroupAdmins {
  isLoading: boolean
  errorOccured: boolean
  records: IUser[]
}

export class GroupAdminsQuery extends QueryEntity<GroupAdminsState> {
  public getGroupAdmins = (values = this.getValue()): IGroupAdmins => {
    return {
      isLoading: values.loading || false,
      errorOccured: values.error,
      records: this.getAll(),
    }
  }

  public getGroupAdmins$: Observable<IGroupAdmins> = this.select((values) =>
    this.getGroupAdmins(values)
  )

  constructor(protected store: GroupAdminsStore) {
    super(store)
  }
}

export const groupAdminsQuery = new GroupAdminsQuery(groupAdminsStore)
