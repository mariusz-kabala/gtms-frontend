import express from 'express'
import next from 'next'

jest.mock('next', () =>
  jest.fn().mockImplementation(() => ({
    getRequestHandler: jest.fn(),
    prepare: jest.fn(),
  }))
)

jest.mock('next-i18next/middleware')

jest.mock('express')

describe('Server', () => {
  it('Should setup express instance', async done => {
    const server = {
        use: jest.fn(),
        get: jest.fn(),
        listen: jest.fn(),
      }
      // eslint-disable-next-line
    ;(express as any).mockImplementation(() => server)
    await require('./server')

    expect(express).toBeCalledTimes(1)
    expect(next).toBeCalledTimes(1)

    // should setup routes
    expect(server.get).toBeCalledTimes(2)

    // should start the sever
    expect(server.listen).toBeCalledTimes(1)

    done()
  })
})
