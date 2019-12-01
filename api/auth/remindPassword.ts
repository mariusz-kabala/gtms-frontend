import { fetchJSON, makeApiUrl } from '../index'

export interface IRemindPasswordData {
  email: string
}

export const remindPaassReq = (payload: IRemindPasswordData): Promise<{}> =>
  fetchJSON<IRemindPasswordData, {}>(makeApiUrl('auth/remind-password'), {
    values: payload,
  })
