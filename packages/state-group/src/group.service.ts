import {
  IGroupCreateData,
  createGroupAPI,
  IGroupCreateResponse,
} from '@gtms/api-group'
import { GroupType, GroupVisibility } from '@gtms/commons'

export const createNewGroup = async (payload: {
  name: string
  description: string
}): Promise<IGroupCreateResponse> => {
  const data: IGroupCreateData = {
    ...payload,
    type: GroupType.default,
    visibility: GroupVisibility.public,
  }

  const response = await createGroupAPI(data)

  return response
}
