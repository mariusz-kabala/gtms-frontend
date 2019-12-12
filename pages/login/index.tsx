import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { LoginForm } from 'components/login/Form'
import { Logo } from 'components/common/Logo'
import { ImageCover } from 'components/common/ImageCover'
import { useTranslation, Link } from 'i18n'
import { parseCookies, destroyCookie } from 'nookies'
import styles from '../styles.scss'
import { SocialButtons } from 'components/login/SocialButtons'
import { userQuery } from 'state/user'
import { initAuthSession } from 'helpers/auth'
import { redirect } from 'helpers/redirect'

export const LoginPage: NextPage<{ redirectTo?: string }> = ({
  redirectTo,
}) => {
  const { t } = useTranslation('login')
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const sub = userQuery.isActive$.subscribe(isActive => {
      if (userQuery.hasData() && !isActive) {
        redirect('/registration/success')
      }
    })

    const loggedSub = userQuery.isLogged$.subscribe(isLogged => {
      if (isLogged) {
        redirect(redirectTo || '/')
      }
    })

    return () => {
      sub.unsubscribe()
      loggedSub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.page} data-testid="login-page">
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
        {error && <div data-testid="login-page-error">{t(error)}</div>}
        <Logo />
        <LoginForm />
        <div>
          <Link href="/remind-password">
            <a>{t('goToRemindPassword')}</a>
          </Link>
        </div>
        <SocialButtons onFailure={() => setError('socialMediaLoginFailed')} />
        <div>
          <Link href="/registration">
            <a>{t('goToRegistration')}</a>
          </Link>
        </div>
      </section>
      <ImageCover />
    </div>
  )
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  await initAuthSession(ctx)

  if (userQuery.isLogged()) {
    redirect('/', ctx)
  }

  const { redirectTo } = parseCookies(ctx)

  destroyCookie(ctx, 'redirectTo')

  return Promise.resolve({ redirectTo, namespacesRequired: ['login'] })
}

export default LoginPage
