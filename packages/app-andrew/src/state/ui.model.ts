export interface IGroupUI {
  showPromoted: boolean
  showUsers: boolean
}

export interface IUI {
  isLoginModalOpen: boolean
  isNotificationsBarOpen: boolean
  background: string
  backgroundImage?: string
  groups: {
    [groupId: string]: IGroupUI
  }
}
