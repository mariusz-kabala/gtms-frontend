import React from "react"
import App, { Container, AppContext } from "next/app"
import RulesProvider from "providers/Rules"
import { appWithTranslation } from "../i18n"

class GTMSApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

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
