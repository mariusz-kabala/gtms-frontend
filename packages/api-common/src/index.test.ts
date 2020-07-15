import { fetchJSON, makeApiUrl } from './index'
import { FetchMock } from 'jest-fetch-mock'
import getConfig from 'next/config'

const fetchMock = fetch as FetchMock

jest.mock('node-fetch', () =>
  jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: jest.fn(),
    })
  )
)

describe('fetchJSON', () => {
  beforeEach(() => {
    ;(fetch as FetchMock).resetMocks()
  })

  it('Should return proper API url', () => {
    ;(getConfig as jest.Mock).mockImplementation(() => ({
      publicRuntimeConfig: {
        FE_API_URL: 'http://fake.com',
      },
    }))

    expect(makeApiUrl('test/fake/api')).toBe('http://fake.com/v1/test/fake/api')
  })

  it('Should make a request with proper params', async (done) => {
    fetchMock.mockResponse('{}')
    await fetchJSON('test/fake/url')

    expect(fetch).toBeCalledTimes(1)
    expect(fetch).toBeCalledWith('test/fake/url', {
      timeout: 5000,
      headers: {},
      method: 'GET',
    })
    done()
  })

  it('Should send proper POST request', async (done) => {
    fetchMock.mockResponse('{}')

    await fetchJSON('test/fake/url', {
      values: {
        foo: 'bar',
      },
    })

    expect(fetch).toBeCalledTimes(1)
    expect(fetch).toBeCalledWith('test/fake/url', {
      timeout: 5000,
      body: '{"foo":"bar"}',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    done()
  })

  it('Should add params to request header', async (done) => {
    fetchMock.mockResponse('{}')
    await fetchJSON('test/fake/url', {
      values: {},
      headers: {
        foo: 'bar',
      },
    })

    expect(fetch).toBeCalledTimes(1)
    expect(fetch).toBeCalledWith('test/fake/url', {
      timeout: 5000,
      method: 'GET',
      headers: {
        foo: 'bar',
      },
    })
    done()
  })
})
