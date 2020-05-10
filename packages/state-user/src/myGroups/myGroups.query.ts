import { Query } from '@datorama/akita'
import { IGroup } from '@gtms/commons'
import { myGroupsStore, MyGroupsStore, IMyGroupsStore } from './myGroups.store'
import { Observable } from 'rxjs'

export class MyGroupsQuery extends Query<IMyGroupsStore> {
  constructor(protected store: MyGroupsStore) {
    super(store)
  }

  public favGroups = (values = this.getValue()): IGroup[] => {

    if (Array.isArray(values.favs) && values.favs.length > 0) {
      return values.favs.slice(0, 6)
    }

    if (
      values.isLoading ||
      values.errorOccurred ||
      !Array.isArray(values.admin) ||
      !Array.isArray(values.member) ||
      !Array.isArray(values.owner)
    ) {
      return []
    }
    const groups = values.owner

    values.admin.forEach((group) => {
      if (!groups.some((g) => group.id === g.id)) {
        groups.push(group)
      }
    })

    values.member.forEach((group) => {
      if (!groups.some((g) => group.id === g.id)) {
        groups.push(group)
      }
    })

    return groups.slice(0, 6)
  }

  public favGroups$: Observable<IGroup[]> = this.select((values) =>
    this.favGroups(values)
  )

  public groups = (values = this.getValue()) => {
    return {
      admin: values.admin || [],
      owner: values.owner || [],
      member: values.member || [],
      favs: values.favs || [],
    }
  }

  public groups$: Observable<{
    admin: IGroup[]
    owner: IGroup[]
    member: IGroup[]
    favs: IGroup[]
  }> = this.select((values) => this.groups(values))

  public isLoaded = (values = this.getValue()): boolean => {
    return values.isLoaded
  }

  public isInFavs = (group: IGroup, values = this.getValue()): boolean => {
    if (!Array.isArray(values.favs)) {
      return false
    }
    return values.favs.some(g => g.id === group.id)
  }
}

export const myGroupsQuery = new MyGroupsQuery(myGroupsStore)
