import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { LoginForm } from 'components/login/Form'
import { ImageCover } from 'components/common/ImageCover'
import { Navigation } from 'components/common/Navigation'
import { useTranslation } from 'i18n'
import { parseCookies, destroyCookie } from 'nookies'
import commonCss from '../styles.scss'
import Router from 'next/router'

const LoginPage: NextPage<{ redirectTo?: string }> = ({ redirectTo }) => {
  const { t, i18n } = useTranslation('login')

  return (
    <div className={commonCss.page}>
      <section
        style={{
          // @todo remove it soon
          position: 'relative',
          background: 'black',
          padding: '20px',
          zIndex: 1,
        }}
      >
        <div className={commonCss.header}>
          <p>{t('subtitle')}</p>
          <h1>{t('title')}</h1>
        </div>
        <LoginForm
          onSuccess={() =>
            Router.push({
              pathname: `/${i18n.language}${redirectTo || '/'}`,
            })
          }
        />
      </section>
      <Navigation />
      <ImageCover />
    </div>
  )
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  const { redirectTo } = parseCookies(ctx)

  destroyCookie(ctx, 'redirectTo')

  return Promise.resolve({ redirectTo })
}

export default LoginPage
