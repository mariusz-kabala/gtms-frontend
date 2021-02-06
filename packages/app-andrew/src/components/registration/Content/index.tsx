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
import { Modal } from '@gtms/ui/Modal'
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
    <>
      <div className={styles.pageWrapper} data-testid="registration-page">
        {error && (
          <Modal onClose={() => setError(undefined)}>
            <div
              className={styles.modalError}
              data-testid="registration-page-error"
            >
              <h2 className={styles.header}>Title</h2>
              <p className={styles.desc}>{t(error)}</p>
              <Button additionalStyles={styles.btn} onClick={() => null}>
                ok
              </Button>
            </div>
          </Modal>
        )}
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div>
              {' '}
              {/* for centering vertically */}
              <div className={styles.headerWrapper}>
                <h2 className={styles.header}>Sign up</h2>
                <p>
                  Sunt sint deserunt occaecat reprehenderit est fugiat ex sunt
                  quis nulla deserunt sit culpa.
                </p>
              </div>
              <SocialButtons
                additionalStyles={styles.socialButtons}
                onFailure={() => setError('socialMediaRegistrationFailed')}
              />
              <div className={styles.or}>
                <span>or</span>
              </div>
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
      </div>
      <div className={styles.pageBg} />
    </>
  )
}
