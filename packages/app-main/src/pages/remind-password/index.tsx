import React, { useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import { Logo } from '@gtms/ui/Logo'
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
    <div data-testid="remind-password-page" className={styles.wrapper}>
      <div>
        <Logo />
        {!showConfirmation && (
          <RemindPasswordForm onSuccess={() => setShowConfirmation(true)} />
        )}
        {showConfirmation && (
          <p data-testid="remind-password-success-confirmation">{t('info')}</p>
        )}
        <Link href={`/login`}>
          <a>{t('goToLoginPage')}</a>
        </Link>
        <span>
          {/* @todo remove temporary code */}
          {t('subtitle')}
        </span>
      </div>
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
