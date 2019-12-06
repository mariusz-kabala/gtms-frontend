import React, { useState } from 'react'
import styles from 'components/common/Forms/styles.scss'
import { NextPage, NextPageContext } from 'next'
import { LoginForm } from 'components/login/Form'
import { AnimatedComponent } from 'components/common/AnimatedComponent'
import { Logo } from 'components/common/Logo'
import { ImageCover } from 'components/common/ImageCover'
import { useTranslation, Router } from 'i18n'
import { parseCookies, destroyCookie } from 'nookies'
import { SocialButtons } from 'components/login/SocialButtons'

export const LoginPage: NextPage<{ redirectTo?: string }> = ({
  redirectTo,
}) => {
  const { t } = useTranslation('login')
  const [error, setError] = useState<string | undefined>()
  const onSuccess = () =>
    Router.push({
      pathname: `/${redirectTo || ''}`,
    })

  return (
    <div className={styles.wrapper} data-testid="login-page">
      <div className={styles.formWrapper}>
        {error && <div data-testid="login-page-error">{t(error)}</div>}
        <AnimatedComponent>
          <Logo />
        </AnimatedComponent>
        <LoginForm onSuccess={onSuccess} />
        <SocialButtons
          onSuccess={onSuccess}
          onFailure={() => setError('SocialMediaLoginFailed')}
        />
      </div>
      <ImageCover />
      <span>
        {/* @todo remove temporary code */}
        {t('subtitle')}
      </span>
    </div>    
  )
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  const { redirectTo } = parseCookies(ctx)

  destroyCookie(ctx, 'redirectTo')

  return Promise.resolve({ redirectTo, namespacesRequired: ['login'] })
}

export default LoginPage
