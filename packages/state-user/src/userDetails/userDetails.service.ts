import { fetchUserDetails } from '@gtms/api-auth'
import { userDetailsStore } from './userDetails.store'

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
