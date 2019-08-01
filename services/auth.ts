import { loginUser, ILoginRequestPayload, ILoginResponse } from 'api/anonymous'
import { parseJwt } from 'helpers/jwt'

interface IToken {
  expiresAt: number
  value: string
}

class AuthService {
  private _user: any // todo create the interface
  private _jwt: IToken | null = null
  private _refreshToken: IToken | null = null

  constructor() {
    // todo
  }

  public get jwt(): IToken | null {
    return this._jwt
  }

  public async login(payload: ILoginRequestPayload): Promise<void> {
    try {
      const { accessToken, refreshToken }: ILoginResponse = await loginUser(
        payload
      )
      const now = new Date()

      const parsedAccessToken = this.parseJwt(accessToken)
      const parsedRefreshToken = this.parseJwt(refreshToken)

      if (!parsedAccessToken || !parsedRefreshToken) {
        return
      }

      this._jwt = {
        expiresAt: now.getTime() + parsedAccessToken.expiresIn * 1000,
        value: accessToken,
      }

      this._refreshToken = {
        expiresAt: now.getTime() + parsedRefreshToken.expiresIn * 1000,
        value: refreshToken,
      }
    } catch (err) {}
  }

  public logout(): void {}

  public refreshJWT(): void {}

  private parseJwt(token: string) {
    try {
      return parseJwt(token)
    } catch (err) {
      console.error(`Can not parse token; ${err}`)
    }
  }
}

export const authService = new AuthService()
