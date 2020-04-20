import React from 'react'
import App from 'next/app'
import '@gtms/styles/scss/global.scss'
import { appWithTranslation } from '@gtms/commons/i18n'
import { NavigationDot } from '@gtms/ui/NavigationDot'

class GTMSApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        {/* <> is required here, if there will be added any wrapper which generates <div> instaed of <>, then css must be refactored. Height of the page (100%) will break so it will break e.g login / register page */}
        <NavigationDot />
        <Component {...pageProps} />
      </>
    )
  }
}

export default appWithTranslation(GTMSApp)
