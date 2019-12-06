import React, { useState } from 'react'
import styles from 'components/common/Forms/styles.scss'
import { NextPage } from 'next'
import { AnimatedComponent } from 'components/common/AnimatedComponent'
import { ImageCover } from 'components/common/ImageCover'
import { Logo } from 'components/common/Logo'
import { RemindPasswordForm } from 'components/remind-password/Form'
import { useTranslation, Link } from 'i18n'

export const RemindPasswordPage: NextPage<{}> = () => {
  const { t } = useTranslation('remindPassword')
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  return (
    <div data-testid="remind-password-page" className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <AnimatedComponent>
          <Logo />
        </AnimatedComponent>
        {!showConfirmation && (
          <RemindPasswordForm onSuccess={() => setShowConfirmation(true)} />
        )}
        {showConfirmation && (
          <p data-testid="remind-password-success-confirmation">{t('info')}</p>
        )}
        <Link href={`/login`}>
          <a>{t('goToLoginPage')}</a>
        </Link>
      </div>
      <ImageCover />
      <span>
        {/* @todo remove temporary code */}
        {t('subtitle')}
      </span>
    </div>
  )
}

RemindPasswordPage.getInitialProps = async () => {
  return Promise.resolve({ namespacesRequired: ['remindPassword'] })
}

export default RemindPasswordPage
