import { Store } from '@datorama/akita'

export interface IWPNState {
  isEnabled: boolean
  isSupported: boolean
}

export class WPNStore extends Store<IWPNState> {
  constructor() {
    super(
      {
        isEnabled: false,
        isSupported: false,
      },
      {
        name: 'wpn',
      }
    )
  }
}

export const wpnStore = new WPNStore()
