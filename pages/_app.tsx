import React from "react"
import App, { Container, AppContext } from "next/app"
import TranslationsProvider from "providers/Translations"
import RulesProvider from "providers/Rules"

class GTMSApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}
    console.log("getInitialProps")
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <TranslationsProvider>
          <RulesProvider>
            <Component {...pageProps} />
          </RulesProvider>
        </TranslationsProvider>
      </Container>
    )
  }
}

export default GTMSApp
