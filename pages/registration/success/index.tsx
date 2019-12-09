import React from 'react'
import { Logo } from 'components/common/Logo'
import { NextPage } from 'next'
import { useTranslation, Link } from 'i18n'
import { ImageCover } from 'components/common/ImageCover'
import styles from '../../styles.scss'

export const RegistrationSuccessPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')

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
            <Link href={`login`}>
              <a>{t('goToLoginPage')}</a>
            </Link>
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
