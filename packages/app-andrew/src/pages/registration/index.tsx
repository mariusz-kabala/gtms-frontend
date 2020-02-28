import React, { useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useState } from 'react'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { userQuery } from '@gtms/state-user'
import { RegistrationForm } from '../../components/registration/Form'
import { SocialButtons } from '../../components/login/SocialButtons'
import { initAuthSession } from '@gtms/commons/helpers/auth'
import { redirect } from '@gtms/commons/helpers/redirect'
import styles from './styles.scss'

export const RegistrationPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const sub = userQuery.isActive$.subscribe(isActive => {
      if (userQuery.hasData() && !isActive) {
        redirect('/registration/success')
      }
    })
    return () => sub.unsubscribe()
  }, [])

  return (
    <div className={styles.wrapper} data-testid="registration-page">
      <div className={styles.left}>
        <div>
          {error && <div data-testid="login-page-error">{t(error)}</div>}
          <h1>Tempor irure qui exce</h1>
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
          <RegistrationForm />
          <div className={styles.goToLoginButton}>
            <Link href="/login">{t('goToLogin')}</Link>
          </div>
          <SocialButtons
            additionalStyles={styles.socialButtons}
            onFailure={() => setError('socialMediaRegistrationFailed')}
          />
        </div>
      </div>
      <div
        className={styles.right}
        style={{ backgroundImage: `url('/images/temp_images/andrew_bg.jpg')` }}
      ></div>
    </div>
  )
}

RegistrationPage.getInitialProps = async (ctx: NextPageContext) => {
  await initAuthSession(ctx)

  if (userQuery.isLogged()) {
    redirect('/', ctx)
  }

  if (userQuery.hasData() && !userQuery.isActive()) {
    redirect('/registration/success', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['registration'] })
}

export default RegistrationPage
