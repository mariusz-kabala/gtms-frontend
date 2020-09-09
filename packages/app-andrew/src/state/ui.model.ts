export interface IUI {
  isLoginModalOpen: boolean
  isNotificationsBarOpen: boolean
  background: string
  groupsSidebar: {
    [groupsId: string]: boolean
  }
}
