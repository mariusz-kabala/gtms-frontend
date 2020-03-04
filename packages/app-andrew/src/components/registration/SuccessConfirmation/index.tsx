import React, { FC } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { Link } from '@gtms/commons/i18n'

export const SuccessConfirmation: FC<{}> = () => {
  const { t } = useTranslation('registration')

  return (
    <div data-testid="registration-success-confirmation">
      <h2>{t('registrationSuccessMessage')}</h2>
      <div>
        <Link href={`login`}>{t('goToLoginPage')}</Link>
      </div>
    </div>
  )
}
