import express from 'express'
import next from 'next'
import proxy from 'express-http-proxy'

jest.mock('next', () =>
  jest.fn().mockImplementation(() => ({
    getRequestHandler: jest.fn(),
    prepare: jest.fn(),
  }))
)

jest.mock('next-i18next/middleware')

jest.mock('express-http-proxy')

jest.mock('express')

describe('Server', () => {
  it('Should setup express instance', async done => {
    process.env.API_URL = 'http://fake-api.com'
    let proxyUrl
    // eslint-disable-next-line
    let proxyParams: any
    const server = {
        use: jest.fn(),
        get: jest.fn(),
        listen: jest.fn(),
      }
      // eslint-disable-next-line
    ;(express as any).mockImplementation(() => server)
    ;(proxy as jest.Mock).mockImplementation((url, params) => {
      proxyUrl = url
      proxyParams = params
    })
    await require('./server')

    expect(proxy).toBeCalledTimes(1)
    expect(proxyUrl).toBe('http://fake-api.com')
    expect(proxyParams.https).toBe(false)

    expect(proxyParams.proxyReqPathResolver({ url: '/v1/auth' })).toBe(
      '/api/v1/auth'
    )

    expect(express).toBeCalledTimes(1)
    expect(next).toBeCalledTimes(1)

    // should setup routes
    expect(server.get).toBeCalledTimes(2)

    // should start the sever
    expect(server.listen).toBeCalledTimes(1)

    done()
  })
})
