import React, { useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useState } from 'react'
import { useTranslation, Link } from 'i18n'
import { userQuery } from 'state/user'
import { RegistrationForm } from 'components/registration/Form'
import { SocialButtons } from 'components/login/SocialButtons'
import { initAuthSession } from 'helpers/auth'
import { redirect } from 'helpers/redirect'
import { Button } from 'components/common/Button'
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
      <div className={styles.text}>
        <div>
          {error && <div data-testid="registration-page-error">{t(error)}</div>}
          <h1>Nisi excepteur aliqua</h1>
          <p>
            Tempor irure qui excepteur ipsum excepteur qui pariatur deserunt
            consequat consequat est. Non eiusmod ea non cupidatat occaecat do
            cupidatat in duis ipsum velit veniam incididunt.
          </p>
          <RegistrationForm />
          <SocialButtons
            additionalStyles={styles.socialButtons}
            onFailure={() => setError('socialMediaLoginFailed')}
          />
          <Button additionalStyles={styles.btnForgotPassword}>
            <Link href="/login">
              <a>{t('goToLogin')}</a>
            </Link>
          </Button>
        </div>
      </div>
      <div
        className={styles.image}
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
