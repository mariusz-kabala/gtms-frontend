import React, { useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import { LoginForm } from 'components/login/Form'
import { Logo } from 'components/common/Logo'
import { ImageCover } from 'components/common/ImageCover'
import { useTranslation } from 'i18n'
import { parseCookies, destroyCookie } from 'nookies'
import styles from '../styles.scss'
import Router from 'next/router'
import { SocialButtons } from 'components/login/SocialButtons'

const LoginPage: NextPage<{ redirectTo?: string }> = ({ redirectTo }) => {
  const { t, i18n } = useTranslation('login')
  const [error, setError] = useState<string | undefined>()
  const onSuccess = () =>
    Router.push({
      pathname: `/${i18n.language}${redirectTo || '/'}`,
    })

  return (
    <div className={styles.page}>
      <section
        style={{
          // @todo remove it soon
          position: 'relative',
          background: 'black',
          padding: '20px',
          zIndex: 1,
        }}
      >
        <div className={styles.header}>
          <p>{t('subtitle')}</p>
          <h1>{t('title')}</h1>
        </div>
        {error && <div>{t(error)}</div>}
        <Logo />
        <LoginForm onSuccess={onSuccess} />
        <SocialButtons
          onSuccess={onSuccess}
          onFailure={() => setError('SocialMediaLoginFailed')}
        />
      </section>
      <ImageCover />
    </div>
  )
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  const { redirectTo } = parseCookies(ctx)

  destroyCookie(ctx, 'redirectTo')

  return Promise.resolve({ redirectTo, namespacesRequired: ['login'] })
}

export default LoginPage
