import React from 'react'
import App from 'next/app'
import { appWithTranslation } from '../i18n'
import RulesProvider from 'providers/Rules'
import { NavigationDot } from 'components/common/NavigationDot'
import 'scss/global.scss'

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
