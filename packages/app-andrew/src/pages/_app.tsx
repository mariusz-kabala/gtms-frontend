import React from 'react'
import cx from 'classnames'
import App, { AppContext } from 'next/app'
import Head from 'next/head'
import { appWithTranslation } from '@gtms/commons/i18n'
import { NavigationWrapper } from 'components/commons/NavigationWrapper'
import { NotificationsSidebar } from 'components/commons/NotificationsSidebar'
import { NotificationsActive } from 'components/commons/NotificationsActive'
import { init, initAuthSession } from '@gtms/state-user'
import { init as initWPN } from '@gtms/state-notification'
import { LoginWindow } from 'components/commons/LoginWindow'
import { uiQuery } from 'state'

import '@gtms/styles/scss/global.scss'
import './tooltip.scss'
import styles from './appStyles.scss'

interface GTMSAppProps {
  auth?: {
    accessToken?: string
    refreshToken?: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageProps: any
}

interface GTMSAppState {
  background: {
    name: string
    className: string
  }
}

class GTMSApp extends App<GTMSAppProps, {}, GTMSAppState> {
  private subscription: any

  constructor(props: any) {
    super(props)

    this.state = {
      background: uiQuery.pageBackground(),
    }
  }

  componentDidMount() {
    const { auth } = this.props

    this.subscription = uiQuery.pageBackground$.subscribe((value) =>
      this.setState({
        background: value,
      })
    )

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

  componentWillUnmount() {
    this.subscription &&
      !this.subscription.closed &&
      this.subscription.unsubscribe()
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <div className={styles.wrapper}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <NotificationsActive />
        <LoginWindow />
        <NotificationsSidebar />
        <NavigationWrapper />
        <Component {...pageProps} />
        <div className={cx(styles.bg, this.state.background.className)} />
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
