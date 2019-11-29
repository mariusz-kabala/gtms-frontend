// put there any custom global setup needed for tests run
import 'mutationobserver-shim'
import { GlobalWithFetchMock } from 'jest-fetch-mock'

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock
customGlobal.fetch = require('jest-fetch-mock')
customGlobal.fetchMock = customGlobal.fetch

export default null
