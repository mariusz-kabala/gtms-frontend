import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { AnimatedComponent } from 'components/common/AnimatedComponent'
import { Button } from 'components/common/Button'
import { ImageCover } from 'components/common/ImageCover'
import { LoginForm } from 'components/login/Form'
import { Logo } from 'components/common/Logo'
import { useTranslation, Link } from 'i18n'
import { parseCookies, destroyCookie } from 'nookies'
import { SocialButtons } from 'components/login/SocialButtons'
import { userQuery } from 'state/user'
import { initAuthSession } from 'helpers/auth'
import { redirect } from 'helpers/redirect'
import styles from './styles.scss'

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
    <div className={styles.wrapper} data-testid="login-page">
      <div>
        {error && <div data-testid="login-page-error">{t(error)}</div>}
        <AnimatedComponent>
          <Logo />
        </AnimatedComponent>
        <LoginForm />
        <div className={styles.actionButtons}>
          <Link href="/registration">
            <Button additionalStyles={styles.btnForgotPassword}>
              {t('goToRegistration')}
            </Button>
          </Link>
          <Link href="/remind-password">
            <Button additionalStyles={styles.btnForgotPassword}>
              {t('goToRemindPassword')}
            </Button>
          </Link>
        </div>
        <SocialButtons
          additionalStyles={styles.socialButtons}
          onFailure={() => setError('socialMediaLoginFailed')}
        />
        <div></div>
      </div>
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
