import { FetchMock } from 'jest-fetch-mock'

declare global {
  namespace NodeJS {
    interface global {
      fetch: FetchMock
    }
  }
}
