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

export const openSidebarNotifications = () =>
  uiStore.update({
    isNotificationsBarOpen: true,
  })

export const closeSidebarNotifications = () =>
  uiStore.update({
    isNotificationsBarOpen: false,
  })

export const toggleSidebarNotifications = () =>
  uiStore.update((values) => ({
    isNotificationsBarOpen: !values.isNotificationsBarOpen,
  }))

export const changePageBackground = (background: string) =>
  uiStore.update({
    background,
  })

export const openGroupSidebar = (groupId: string) => {
  const sidebar = uiStore.getValue().groupsSidebar

  uiStore.update({
    groupsSidebar: {
      ...sidebar,
      [groupId]: true,
    },
  })
}

export const closeGroupSidebar = (groupId: string) => {
  const sidebar = uiStore.getValue().groupsSidebar

  uiStore.update({
    groupsSidebar: {
      ...sidebar,
      [groupId]: false,
    },
  })
}

export const toggleGroupSidebar = (groupId: string) => {
  const sidebar = uiStore.getValue().groupsSidebar

  uiStore.update({
    groupsSidebar: {
      ...sidebar,
      [groupId]: !!(sidebar[groupId] || false),
    },
  })
}
