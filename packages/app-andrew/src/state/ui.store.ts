import { Store, StoreConfig } from '@datorama/akita'
import { IUI } from './ui.model'

@StoreConfig({ name: 'ui' })
export class UIStore extends Store<IUI> {
  constructor() {
    super({
      isLoginModalOpen: false,
      isNotificationsBarOpen: false,
    })
  }
}

export const uiStore = new UIStore()
