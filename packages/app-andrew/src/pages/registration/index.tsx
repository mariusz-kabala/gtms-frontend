import React, { useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { useState } from 'react'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { userQuery, hasAuthSessionCookies } from '@gtms/state-user'
import { RegistrationForm } from '../../components/registration/Form'
import { SocialButtons } from '../../components/login/SocialButtons'
import { redirect } from '@gtms/commons/helpers/redirect'

export const RegistrationPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const sub = userQuery.isActive$.subscribe((isActive) => {
      if (userQuery.hasData() && !isActive) {
        redirect('/registration/success')
      }
    })
    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper} data-testid="registration-page">
      <div className={styles.left}>
        {error && <div data-testid="login-page-error">{t(error)}</div>}
        <h2>Tempor irure qui exce1</h2>
        <p>
          Tempor irure qui excepteur ipsum excepteur qui pariatur deserunt
          consequat aco nsequat est. Non eiusmod ea non cupidatat occaecat do
          cupidatat in duis ipsum velit veniam incididunt.
        </p>
        <p>
          Ad amet sunt voluptate consequat aliquip pariatur. Quis laboris
          incididunt elit.
        </p>
        {error && <div data-testid="registration-page-error">{t(error)}</div>}
        <RegistrationForm onError={() => setError('registrationFailed')} />
        <div className={styles.goToLoginButton}>
          <Link href="/login">{t('goToLogin')}</Link>
        </div>
        <SocialButtons
          additionalStyles={styles.socialButtons}
          onFailure={() => setError('socialMediaRegistrationFailed')}
        />
      </div>
      <div
        className={styles.right}
        style={{ backgroundImage: `url('/images/temp_images/andrew_bg.jpg')` }}
      ></div>
    </div>
  )
}

RegistrationPage.getInitialProps = async (ctx: NextPageContext) => {
  if (hasAuthSessionCookies(ctx)) {
    redirect('/', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['registration'] })
}

export default RegistrationPage
