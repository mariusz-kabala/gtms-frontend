import React, { FC } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
import { Link } from '@gtms/commons/i18n'

export const SuccessConfirmation: FC<{}> = () => {
  const { t } = useTranslation('registration')

  return (
    <div data-testid="registration-success-confirmation">
      <p>{t('registrationSuccessMessage')}</p>
      <Link href={`login`}>
        <a>{t('goToLoginPage')}</a>
      </Link>
    </div>
  )
}
