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
import { RegisterLoginWindow } from 'components/commons/RegisterLoginWindow'
import { uiQuery } from 'state'

import '@gtms/styles/scss/global.scss'
import './tooltip.scss'
import './lightbox.scss'
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
    name: string | null
    className: string
  }
  backgroundImage?: { mini: string; full: string }
  backgroundLoaded: boolean
}

class GTMSApp extends App<GTMSAppProps, {}, GTMSAppState> {
  private subscription: any

  constructor(props: any) {
    super(props)

    this.state = {
      ...uiQuery.pageBackgrounds(),
      backgroundLoaded: false,
    }
  }

  onBgLoad = () =>
    this.setState({
      backgroundLoaded: true,
    })

  componentDidMount() {
    const { auth } = this.props

    this.subscription = uiQuery.pageBackgrounds$.subscribe((value) => {
      this.setState(value)

      let full: string | undefined = undefined

      if (value.backgroundImage) {
        full = value.backgroundImage.full
      } else if (value.background.full) {
        full = value.background.full
      }

      if (full) {
        const img = new Image()
        img.src = full

        if (img.complete) {
          this.onBgLoad()
        } else {
          img.onload = this.onBgLoad
        }
      }
    })

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
    const { background, backgroundImage, backgroundLoaded } = this.state
    return (
      <div className={styles.appWrapper}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <RegisterLoginWindow />
        <NotificationsActive />
        <NotificationsSidebar />
        <NavigationWrapper />
        <Component {...pageProps} />
        <div
          className={cx(
            styles.bg,
            !backgroundImage ? background.className : undefined
          )}
          data-loaded={backgroundLoaded ? 'true' : 'false'}
          style={
            backgroundImage
              ? {
                  backgroundImage: `url(${
                    backgroundLoaded
                      ? backgroundImage.full
                      : backgroundImage.mini
                  })`,
                }
              : undefined
          }
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
