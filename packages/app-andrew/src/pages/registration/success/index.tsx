import React from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { Logout } from '@gtms/ui/Logout'
import { userQuery } from '@gtms/state-user'
import { initAuthSession } from '@gtms/commons/helpers/auth'
import { redirect } from '@gtms/commons/helpers/redirect'

export const RegistrationSuccessPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')

  return (
    <div className={styles.wrapper} data-testid="registration-success-page">
      <div>
        <h3>{t('registrationSuccessMessage')}</h3>
        <Logout text={t('goToLoginPage')} />
      </div>
    </div>
  )
}

RegistrationSuccessPage.getInitialProps = async (ctx: NextPageContext) => {
  await initAuthSession(ctx)

  if (userQuery.isLogged()) {
    redirect('/', ctx)
  }

  if (!userQuery.hasData()) {
    redirect('/registration', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['registration'] })
}

export default RegistrationSuccessPage
