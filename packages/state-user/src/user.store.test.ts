import { userStore } from './user.store'

describe('User store', () => {
  it('Should be an instance', () => {
    expect(userStore).toBeTruthy()
  })

  it('Should not be initialized after creation', () => {
    expect(userStore.getValue()).toEqual({
      isInitialized: false,
    })
  })
})
