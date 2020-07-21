import React, { useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { useState } from 'react'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { userQuery, hasAuthSessionCookies } from '@gtms/state-user'
import { RegistrationForm } from '../../components/registration/Form'
import { SocialButtons } from '../../components/login/SocialButtons'
import { redirect } from '@gtms/commons/helpers/redirect'
// ui
import { Button } from '@gtms/ui/Button'
import { Picture } from '@gtms/ui/Picture'
import { TagsGrid } from '@gtms/ui/TagsGrid'

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
    <div className={styles.pageWrapper} data-testid="registration-page">
      <div
        className={styles.wrapper}
        style={{
          backgroundImage: `url('/images/temp_images/login_bg.png')`,
        }}
      >
        <div className={styles.content}>
          <div>
            {error && <div data-testid="login-page-error">{t(error)}</div>}
            <div className={styles.header}>
              <Picture
                additionalStyles={styles.avatar}
                jpg={'/images/avatars/avatar-10.png'}
              />
              <div>
                <h2>Sign up</h2>
                <p>
                  Sunt sint deserunt occaecat reprehenderit est fugiat ex sunt
                  quis nulla deserunt sit culpa.
                </p>
              </div>
            </div>
            <SocialButtons
              additionalStyles={styles.socialButtons}
              onFailure={() => setError('socialMediaRegistrationFailed')}
            />
            <div className={styles.or}>
              <span>or</span>
            </div>
            {error && (
              <div data-testid="registration-page-error">{t(error)}</div>
            )}
            <RegistrationForm
              additionalStyles={styles.form}
              onError={() => setError('registrationFailed')}
            />
            <div className={styles.actionButtons}>
              <Link href="/login">
                <Button additionalStyles={styles.btn}>{t('goToLogin')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <TagsGrid additionalStyles={styles.tagsGrid} />
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
