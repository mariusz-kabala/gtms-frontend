import React, { useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import { RemindPasswordForm } from '../../components/remind-password/Form'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { redirect } from '@gtms/commons/helpers/redirect'
import { hasAuthSessionCookies } from '@gtms/state-user/src/helpers'
import styles from './styles.scss'

export const RemindPasswordPage: NextPage<{}> = () => {
  const { t } = useTranslation('remindPassword')
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  return (
    <div className={styles.wrapper} data-testid="remind-password-page">
      <div>
        <h2>Remind password</h2>
        <p>
          Wyślemy Ci link do zresetowania hasła na Twój adres mailowy. Podaj go
          w polu ponizej.
        </p>
        {!showConfirmation && (
          <RemindPasswordForm
            additionalStyles={styles.form}
            onSuccess={() => setShowConfirmation(true)}
          />
        )}
        {showConfirmation && (
          <p data-testid="remind-password-success-confirmation">{t('info')}</p>
        )}
        <div className={styles.btn}>
          <Link href={`/login`}>{t('goToLoginPage')}</Link>
        </div>
      </div>
    </div>
  )
}

RemindPasswordPage.getInitialProps = async (ctx: NextPageContext) => {
  if (hasAuthSessionCookies(ctx)) {
    redirect('/', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['remindPassword'] })
}

export default RemindPasswordPage
