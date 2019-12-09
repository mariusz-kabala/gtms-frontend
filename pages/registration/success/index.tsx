import React, { useEffect } from 'react'
import { Logo } from 'components/common/Logo'
import { NextPage } from 'next'
import { useTranslation, Router } from 'i18n'
import { ImageCover } from 'components/common/ImageCover'
import { Logout } from 'components/common/Logout'
import styles from '../../styles.scss'
import { userQuery } from 'state/user'

export const RegistrationSuccessPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')

  useEffect(() => {
    if (!userQuery.hasData() || userQuery.getValue().isActive) {
      Router.push({
        pathname: '/registration',
      })
    }
  }, [])

  return (
    <>
      <div className={styles.page} data-testid="registration-success-page">
        <div
          style={{
            position: 'relative',
            zIndex: 1000,
            background: '#000',
            padding: '20px',
          }}
        >
          <Logo />
          <div>
            <p>{t('registrationSuccessMessage')}</p>
            <Logout text={t('goToLoginPage')} />
          </div>
        </div>
      </div>
      <ImageCover />
    </>
  )
}

RegistrationSuccessPage.getInitialProps = async () => {
  return Promise.resolve({ namespacesRequired: ['registration'] })
}

export default RegistrationSuccessPage
