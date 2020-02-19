import { FC } from 'react'

export interface NFC<P = {}> extends FC<P> {
  getInitialProps?: (ctx: any) => Promise<P>
}
