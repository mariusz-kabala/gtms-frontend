import React from 'react'
import App, { Container } from 'next/app'
import RulesProvider from 'providers/Rules'
import { appWithTranslation } from '../i18n'
import 'scss/reset.scss'

class GTMSApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <RulesProvider>
          <Component {...pageProps} />
        </RulesProvider>
      </Container>
    )
  }
}

export default appWithTranslation(GTMSApp)
