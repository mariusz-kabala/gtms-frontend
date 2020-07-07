import React from 'react'
import App, { AppContext } from 'next/app'
import Head from 'next/head'
import '@gtms/styles/scss/global.scss'
import styles from './styles.scss'
import { appWithTranslation } from '@gtms/commons/i18n'
import { Navigation } from 'components/commons/Navigation'
import { NavigationDots } from 'components/commons/NavigationDots'
import { NotificationsSidebar } from 'components/commons/NotificationsSidebar'
import { NotificationsActive } from 'components/commons/NotificationsActive'
import { init, initAuthSession } from '@gtms/state-user'
import { init as initWPN } from '@gtms/state-notification'
import { LoginWindow } from 'components/commons/LoginWindow'

interface GTMSAppProps {
  auth?: {
    accessToken?: string
    refreshToken?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

class GTMSApp extends App<GTMSAppProps> {
  componentDidMount() {
    const { auth } = this.props

    if (auth?.accessToken && auth.refreshToken) {
      init(
        auth as {
          accessToken: string
          refreshToken: string
        }
      )
      initWPN()
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <div className={styles.wrapper}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <NotificationsSidebar />
        <div className={styles.tempNav}>
          <Navigation />
          <NavigationDots />
        </div>
        <div className={styles.wrapperPage}>
          <NotificationsActive />
          <div className={styles.pageContent}>
            <Component {...pageProps} />
          </div>
        </div>
        <LoginWindow />
        <div
          className={styles.bg}
          style={{
            backgroundImage: `url('/images/temp_images/group_bg.png')`,
          }}
        />
      </div>
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
