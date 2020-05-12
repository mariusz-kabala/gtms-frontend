import { uiStore } from './ui.store'

export const openLoginModal = () =>
  uiStore.update({
    isLoginModalOpen: true,
  })

export const closeLoginModal = () =>
  uiStore.update({
    isLoginModalOpen: false,
  })

export const toggleLoginModal = () =>
  uiStore.update((values) => ({
    isLoginModalOpen: !values.isLoginModalOpen,
  }))
