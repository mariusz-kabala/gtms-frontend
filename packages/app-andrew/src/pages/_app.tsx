import React from 'react'
import App, { AppContext } from 'next/app'
import '@gtms/styles/scss/global.scss'
import styles from './styles.scss'
import { appWithTranslation } from '@gtms/commons/i18n'
import { Navigation } from '@gtms/ui/Navigation'
import { NavigationDot } from '@gtms/ui/NavigationDot'
import { initAuthSession } from '@gtms/commons/helpers/auth'
import { init } from '@gtms/state-user'
import { LoginWindow } from '../components/commons/LoginWindow'

interface GTMSAppProps {
  auth?: {
    accessToken?: string
    refreshToken?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

class GTMSApp extends App<GTMSAppProps> {
  componentWillMount() {
    const { auth } = this.props

    if (auth?.accessToken && auth.refreshToken) {
      init(
        auth as {
          accessToken: string
          refreshToken: string
        }
      )
    }
  }
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <div className={styles.wrapper}>
          <Navigation />
          <Component {...pageProps} />
        </div>
        <NavigationDot />
        <LoginWindow />
      </>
    )
  }
}

App.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const componentGetInitialProps =
    Component.getInitialProps || (() => Promise.resolve())

  const auth = await initAuthSession(ctx)
  const pageProps = await componentGetInitialProps(ctx)

  return {
    auth,
    pageProps,
  }
}

export default appWithTranslation(GTMSApp)
