import React from 'react'
import App, { AppContext } from 'next/app'
import '@gtms/styles/scss/global.scss'
import styles from './styles.scss'
import { appWithTranslation } from '@gtms/commons/i18n'
import { Navigation } from 'components/commons/Navigation'
import { NotificationsActive } from 'components/commons/NotificationsActive'
import { NavigationDots } from 'components/commons/NavigationDots'
import { init, initAuthSession } from '@gtms/state-user'
import { LoginWindow } from 'components/commons/LoginWindow'
// import ReactTooltip from 'react-tooltip' // todo - make sure that we actually needed it, as it creates some issues with SSR
import { NotificationsSidebar } from 'components/commons/NotificationsSidebar'

interface GTMSAppProps {
  auth?: {
    accessToken?: string
    refreshToken?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

class GTMSApp extends App<GTMSAppProps> {
  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
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
      <div className={styles.wrapper}>
        <Navigation />
        <div
          className={styles.bg}
          style={{ backgroundImage: `url('/images/temp_images/group_bg_3.png')` }} />
        <NotificationsSidebar />
        <div className={styles.wrapperPage}>
          <NavigationDots />
          <NotificationsActive />
          <div className={styles.pageContent}>
            <Component {...pageProps} />
          </div>
        </div>
        <LoginWindow />
        {/* @todo consider do we need ReactTooltip? */}
        {/* <ReactTooltip /> */}
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
