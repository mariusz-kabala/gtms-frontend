import React, { FC } from 'react'
import { useTranslation } from 'i18n'
import { Link } from 'i18n'

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
