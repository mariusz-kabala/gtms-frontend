import React from 'react'
import App from 'next/app'
import RulesProvider from 'providers/Rules'
import 'scss/global.scss'
import 'scss/reset.scss'
import { appWithTranslation } from '../i18n'

class GTMSApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <RulesProvider>
        <Component {...pageProps} />
      </RulesProvider>
    )
  }
}

export default appWithTranslation(GTMSApp)
