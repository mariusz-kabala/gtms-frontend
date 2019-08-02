import {
  loginUser,
  ILoginRequestPayload,
  ILoginResponse,
} from 'services/auth/auth.api'
import { AuthStore, authStore } from 'services/auth/state/auth.store'
import { parseJwt } from 'services/auth/auth.helpers'
import { IJwt } from 'services/auth/auth.models'

class AuthService {
  constructor(private authStore: AuthStore) {}

  public async login(payload: ILoginRequestPayload): Promise<void> {
    try {
      const { accessToken, refreshToken }: ILoginResponse = await loginUser(
        payload
      )
      const parsedAccessToken: IJwt | undefined = this.parseJwt(accessToken)
      const parsedRefreshToken: IJwt | undefined = this.parseJwt(refreshToken)

      if (!parsedAccessToken || !parsedRefreshToken) {
        return
      }

      this.authStore.update({
        user: {
          id: parsedAccessToken.id,
          name: parsedAccessToken.name,
          surname: parsedAccessToken.surname,
          email: parsedAccessToken.email,
          countryCode: parsedAccessToken.countryCode,
          languageCode: parsedAccessToken.languageCode,
          roles: parsedAccessToken.roles,
          isActive: parsedAccessToken.isActive,
        },
        jwt: {
          expiresAt: new Date(parsedAccessToken.exp * 1000).getTime(),
          value: accessToken,
        },
        refreshToken: {
          expiresAt: new Date(parsedRefreshToken.exp * 1000).getTime(),
          value: refreshToken,
        },
      })
    } catch (err) {}
  }

  public logout(): void {}

  public refreshJWT(): void {}

  private parseJwt(token: string): IJwt | undefined {
    try {
      return parseJwt<IJwt>(token)
    } catch (err) {
      console.error(`Can not parse token; ${err}`)
    }
  }
}

export const authService = new AuthService(authStore)
