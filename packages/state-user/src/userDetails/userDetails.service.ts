import { fetchUserDetails } from '@gtms/api-auth'
import { userDetailsStore } from './userDetails.store'
import { IUserDetailsState } from './userDetails.model'

export const getUserDetails = async (id: string) => {
  userDetailsStore.reset()
  userDetailsStore.update({
    isLoading: true,
    errorOccured: false,
  })

  try {
    const details = await fetchUserDetails(id)

    userDetailsStore.update({
      ...details,
      isLoading: false,
      errorOccured: false,
    })
  } catch (err) {
    userDetailsStore.update({
      isLoading: false,
      errorOccured: true,
    })
  }
}

export const initialize = (data: IUserDetailsState) =>
  userDetailsStore.update(data)
