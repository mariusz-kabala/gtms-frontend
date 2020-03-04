import React from 'react'
import App from 'next/app'
import RulesProvider from '../providers/Rules'
import '@gtms/styles/scss/global.scss'
import { appWithTranslation } from '@gtms/commons/i18n'
import { NavigationDot } from '@gtms/ui/NavigationDot'

class GTMSApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <RulesProvider>
        <NavigationDot />
        <Component {...pageProps} />
      </RulesProvider>
    )
  }
}

export default appWithTranslation(GTMSApp)
