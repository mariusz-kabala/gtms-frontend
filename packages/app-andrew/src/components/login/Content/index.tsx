import React, { FC, useState, useEffect } from 'react'
import { redirect } from '@gtms/commons/helpers/redirect'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { userQuery } from '@gtms/state-user'
import { LoginForm } from '../Form'
import { SocialButtons } from '../SocialButtons'
// ui
import { AiOutlineForm } from 'react-icons/ai'
import { MdSettingsBackupRestore } from 'react-icons/md'
import { Button } from '@gtms/ui/Button'
// styles
import styles from './styles.scss'

export const LoginContent: FC<{ registrationLink?: string }> = ({
  children,
  registrationLink = '/registration',
}) => {
  const { t } = useTranslation('login')
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const sub = userQuery.isActive$.subscribe((isActive) => {
      if (userQuery.hasData() && !isActive) {
        redirect('/registration/success')
      }
    })

    const loggedSub = userQuery.isLogged$.subscribe((isLogged) => {
      if (isLogged) {
        redirect('/')
      }
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
      loggedSub && !loggedSub.closed && loggedSub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.pageWrapper} data-testid="login-page">
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div>
            {error && <div data-testid="login-page-error">{t(error)}</div>}
            <div className={styles.headerWrapper}>
              <div>
                <h2 className={styles.header}>Sign in</h2>
                <p>
                  Sunt sint deserunt occaecat reprehenderit est fugiat ex sunt
                  quis nulla deserunt sit culpa.
                </p>
              </div>
            </div>
            <SocialButtons
              additionalStyles={styles.socialButtons}
              onFailure={() => setError('socialMediaLoginFailed')}
            />
            <div className={styles.or}>
              <span>or</span>
            </div>
            <LoginForm additionalStyles={styles.form} />
            <div className={styles.actionButtons}>
              <Link href="/remind-password">
                <Button additionalStyles={styles.btn} testid="remind-pass-link">
                  <i>
                    <MdSettingsBackupRestore />
                  </i>
                  {t('goToRemindPassword')}
                </Button>
              </Link>
              <Link href={registrationLink}>
                <Button
                  additionalStyles={styles.btn}
                  testid="registration-pass-link"
                >
                  <i>
                    <AiOutlineForm />
                  </i>
                  {t('goToRegistration')}
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
