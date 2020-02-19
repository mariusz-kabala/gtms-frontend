import { FetchMock } from 'jest-fetch-mock'

declare global {
  namespace NodeJS {
    export interface Global {
      fetch: FetchMock
    }

    export interface ProcessEnv {
      FB_APP_ID: string
      GOOGLE_CLIENT_ID: string
      API_URL: string
      FE_API_URL: string
    }
  }
}
