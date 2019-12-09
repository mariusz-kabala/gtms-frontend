import React from 'react'
import { Logo } from 'components/common/Logo'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'i18n'
import { userQuery } from 'state/user'
import { RegistrationForm } from 'components/registration/Form'
import { SuccessConfirmation } from 'components/registration/SuccessConfirmation'
import { ImageCover } from 'components/common/ImageCover'
import { SocialButtons } from 'components/login/SocialButtons'
import styles from '../styles.scss'

const RegistrationPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')
  const [hasUserData, setHasUserData] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const subscription = userQuery.hasData$.subscribe(hasData =>
      setHasUserData(hasData)
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <>
      <div className={styles.page} data-testid="registration-page">
        <div
          style={{
            position: 'relative',
            zIndex: 1000,
            background: '#000',
            padding: '20px',
          }}
        >
          {' '}
          {/* @todo move it to global component */}
          <p>{t('subtitle')}</p>
          <h1>{t('header')}</h1>
          {error && <div data-testid="registration-page-error">{t(error)}</div>}
          <Logo />
          {!hasUserData && (
            <>
              <RegistrationForm />
              <SocialButtons
                onSuccess={() => {}}
                onFailure={() => setError('socialMediaRegistrationFailed')}
              />
            </>
          )}
          {hasUserData && <SuccessConfirmation />}
        </div>
      </div>
      <ImageCover />
    </>
  )
}

export default RegistrationPage
