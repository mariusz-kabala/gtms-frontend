import React, { FC, useState, useEffect } from 'react'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { redirect } from '@gtms/commons/helpers/redirect'
// state
import { userQuery } from '@gtms/state-user'
// components
import { RegistrationForm } from '../Form'
import { SocialButtons } from '../../login/SocialButtons'
// ui
import { IoMdLogIn } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
// styles
import styles from './styles.scss'

export const RegistrationContent: FC<{ loginLink?: string }> = ({
  children,
  loginLink = '/login',
}) => {
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
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div>
            {error && <div data-testid="login-page-error">{t(error)}</div>}
            <div className={styles.headerWrapper}>
              <div>
                <h2 className={styles.header}>Sign up</h2>
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
              <Link href={loginLink}>
                <Button additionalStyles={styles.btn}>
                  <i>
                    <IoMdLogIn />
                  </i>
                  {t('goToLogin')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {children}
      <div
        className={styles.pageBg}
        style={{ backgroundImage: `url('/images/temp-images/login-bg-2.png')` }}
      />
    </div>
  )
}
