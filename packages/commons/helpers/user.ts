import { IUser } from '@gtms/commons/models'

export function getDisplayName(user: IUser) {
  return `${user.name || ''} ${user.surname || ''}`.trim()
}
