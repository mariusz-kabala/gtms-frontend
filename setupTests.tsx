// put there any custom global setup needed for tests run
import 'mutationobserver-shim'
import React from 'react'
import { GlobalWithFetchMock } from 'jest-fetch-mock'

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock
customGlobal.fetch = require('jest-fetch-mock')
customGlobal.fetchMock = customGlobal.fetch

process.env.FE_API_URL = ''

// eslint-disable-next-line
window.FB = {} as any
jest.mock('i18n', () => ({
  useTranslation: jest.fn().mockImplementation(() => ({
    t: (key: string) => key,
  })),
  Router: {
    push: jest.fn(),
  },
  Link: jest.fn().mockImplementation(() => <></>),
  default: jest.fn(),
}))

export default null
