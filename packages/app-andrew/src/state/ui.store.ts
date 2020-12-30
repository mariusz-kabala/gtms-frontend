import { Store, StoreConfig } from '@datorama/akita'
import { IUI } from './ui.model'
import { BACKGROUNDS_GALLERY } from 'enums'

@StoreConfig({ name: 'ui' })
export class UIStore extends Store<IUI> {
  constructor() {
    super({
      isRegisterLoginModalOpen: false,
      isNotificationsBarOpen: false,
      background: BACKGROUNDS_GALLERY[0].className,
      groups: {},
    })
  }
}

export const uiStore = new UIStore()
