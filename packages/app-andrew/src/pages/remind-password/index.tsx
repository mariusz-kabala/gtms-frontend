import React, { useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import { RemindPasswordForm } from '../../components/remind-password/Form'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { initAuthSession } from '@gtms/commons/helpers/auth'
import { redirect } from '@gtms/commons/helpers/redirect'
import { userQuery } from '@gtms/state-user'
import styles from './styles.scss'

export const RemindPasswordPage: NextPage<{}> = () => {
  const { t } = useTranslation('remindPassword')
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)

  return (
    <div className={styles.wrapper} data-testid="remind-password-page">
      <div className={styles.left}>
        <h2>Remind password</h2>
        <p>
          Wyślemy Ci link do zresetowania hasła na Twój adres mailowy. Podaj go
          w polu ponizej.
        </p>
        {!showConfirmation && (
          <RemindPasswordForm onSuccess={() => setShowConfirmation(true)} />
        )}
        {showConfirmation && (
          <p data-testid="remind-password-success-confirmation">{t('info')}</p>
        )}
        <br />
        <div className={styles.btn}>
          <Link href={`/login`}>{t('goToLoginPage')}</Link>
        </div>
      </div>
      <div
        className={styles.right}
        style={{ backgroundImage: `url('/images/temp_images/andrew_bg.jpg')` }}
      ></div>
    </div>
  )
}

RemindPasswordPage.getInitialProps = async (ctx: NextPageContext) => {
  await initAuthSession(ctx)

  if (userQuery.isLogged()) {
    redirect('/', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['remindPassword'] })
}

export default RemindPasswordPage
