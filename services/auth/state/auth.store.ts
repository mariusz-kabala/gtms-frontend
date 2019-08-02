import { Store, StoreConfig } from '@datorama/akita'
import { IUser, IToken } from 'services/auth/auth.models'

export interface IAuthState {
  user: IUser | null
  jwt: IToken | null
  refreshToken: IToken | null
}

export function createInitialState(): IAuthState {
  return {
    user: null,
    jwt: null,
    refreshToken: null,
  }
}

@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<IAuthState> {
  constructor() {
    super(createInitialState())
  }
}

export const authStore = new AuthStore()
