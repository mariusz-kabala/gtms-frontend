import React from 'react'
import App from 'next/app'
import RulesProvider from '../providers/Rules'
import 'scss/global.scss'
import { appWithTranslation } from '@gtms/commons/i18n'

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
