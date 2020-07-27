import { Query } from '@datorama/akita'
import { Observable } from 'rxjs'
import { IFavsStore, FavGroupsStore, myFavGroupsStore } from './favs.store'

export interface IFavRecordStatus {
  isLoading: boolean
  errorOccurred: boolean
  isInFavs: boolean
}

export class FavsQuery extends Query<IFavsStore> {
  constructor(protected store: FavGroupsStore) {
    super(store)
  }

  public getOutdatedData(
    records: string[],
    values = this.getValue()
  ): string[] {
    const ids = Object.keys(values.data)
    if (ids.length === 0) {
      return records
    }

    const result: string[] = []
    const now = new Date().getTime()

    for (const id of records) {
      if (!values.data[id] || now - values.data[id].lastCheck > 300000) {
        // 5min
        result.push(id)
      }
    }

    return result
  }

  public getRecordStatus(
    id: string,
    values = this.getValue()
  ): IFavRecordStatus {
    return {
      isLoading: values.isLoading,
      errorOccurred: values.errorOccurred,
      isInFavs: values.data[id]?.isInFavs || false,
    }
  }

  public getRecordStatus$ = (id: string): Observable<IFavRecordStatus> =>
    this.select((values) => this.getRecordStatus(id, values))
}

export const favGroupsQuery = new FavsQuery(myFavGroupsStore)
