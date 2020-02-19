import { Router } from '../i18n'
import { redirect } from './redirect'

describe('Redirect helper', () => {
  beforeEach(() => {
    ;(Router.push as jest.Mock).mockClear()
  })

  it('Should redirect using Router', () => {
    redirect('/fake/url')

    expect(Router.push).toBeCalledTimes(1)
    expect(Router.push).toBeCalledWith({
      pathname: '/fake/url',
    })
  })

  it('Should redirect using response headers', () => {
    // eslint-disable-next-line
    const ctx = {
      res: {
        writeHead: jest.fn(),
        end: jest.fn(),
      },
    } as any

    redirect('/fake/url', ctx)

    expect(Router.push).not.toBeCalled()
    expect(ctx.res.writeHead).toBeCalledTimes(1)
    expect(ctx.res.writeHead).toBeCalledWith(302, {
      Location: '/fake/url',
    })
    expect(ctx.res.end).toBeCalledTimes(1)
  })
})
