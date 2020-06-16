import React from 'react'
import App, { AppContext } from 'next/app'
import '@gtms/styles/scss/global.scss'
import styles from './styles.scss'
import { appWithTranslation } from '@gtms/commons/i18n'
import { NavigationGroup } from 'components/commons/NavigationGroup'
import { NotificationsActive } from 'components/commons/NotificationsActive'
import { NavigationMain } from 'components/commons/NavigationMain'
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
      <>
        <div className={styles.wrapper}>
          <NavigationGroup />
          <NotificationsSidebar />
          <NotificationsActive />
          <Component {...pageProps} />
        </div>
        <NavigationMain />
        <LoginWindow />
        {/* <ReactTooltip /> */}
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
