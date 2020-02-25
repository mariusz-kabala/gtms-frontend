import React, { useEffect } from 'react'
import { Logo } from '@gtms/ui/Logo'
import { NextPage, NextPageContext } from 'next'
import { useState } from 'react'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { userQuery } from '@gtms/state-user'
import { AnimatedComponent } from '@gtms/ui/AnimatedComponent'
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
      <div className={styles.formWrapper}>
        <AnimatedComponent>
          <Logo />
        </AnimatedComponent>
        {error && <div data-testid="registration-page-error">{t(error)}</div>}
        <RegistrationForm />
        <SocialButtons
          onFailure={() => setError('socialMediaRegistrationFailed')}
        />
        <Link href="/login">
          <a>{t('goToLogin')}</a>
        </Link>
      </div>
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
