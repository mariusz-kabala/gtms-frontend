import React from 'react'
import App from 'next/app'
import '@gtms/styles/scss/global.scss'
import styles from './styles.scss'
import { appWithTranslation } from '@gtms/commons/i18n'
import { Navigation } from '@gtms/ui/Navigation'
import { NavigationDot } from '@gtms/ui/NavigationDot'

class GTMSApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <div className={styles.wrapper}>
          <Navigation />
          <Component {...pageProps} />
        </div>
        <NavigationDot />
      </>
    )
  }
}

export default appWithTranslation(GTMSApp)
