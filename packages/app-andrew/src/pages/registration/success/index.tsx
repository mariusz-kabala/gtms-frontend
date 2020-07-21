import React from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { Logout } from '@gtms/ui/Logout'
import { hasAuthSessionCookies } from '@gtms/state-user/src/helpers'
import { redirect } from '@gtms/commons/helpers/redirect'

export const RegistrationSuccessPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')

  return (
    <div className={styles.pageWrapper} data-testid="registration-success-page">
      <div className={styles.wrapper}>
        <div>
          <h3>{t('registrationSuccessMessage')}</h3>
          <Logout text={t('goToLoginPage')} />
        </div>
      </div>
    </div>
  )
}

RegistrationSuccessPage.getInitialProps = async (ctx: NextPageContext) => {
  if (hasAuthSessionCookies(ctx)) {
    redirect('/', ctx)
  }

  // if (!userQuery.hasData()) {
  //   redirect('/registration', ctx)
  // }

  return Promise.resolve({ namespacesRequired: ['registration'] })
}

export default RegistrationSuccessPage
