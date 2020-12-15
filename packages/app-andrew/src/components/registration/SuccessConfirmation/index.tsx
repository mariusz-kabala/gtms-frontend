import React, { FC } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { Link } from '@gtms/commons/i18n'
import styles from './styles.scss'

export const SuccessConfirmation: FC<{}> = () => {
  const { t } = useTranslation('registration')

  return (
    <div
      className={styles.wrapper}
      data-testid="registration-success-confirmation"
    >
      <h2>{t('registrationSuccessMessage')}</h2>
      <div>
        <Link href={`login`}>{t('goToLoginPage')}</Link>
      </div>
    </div>
  )
}
