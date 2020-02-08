import React from 'react'
import { Logo } from 'components/common/Logo'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'i18n'
import { Logout } from 'components/common/Logout'
import { userQuery } from 'state/user'
import { initAuthSession } from 'helpers/auth'
import { redirect } from 'helpers/redirect'
import styles from './styles.scss'

export const RegistrationSuccessPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')

  return (
    <div data-testid="registration-success-page" className={styles.wrapper}>
      <Logo />
      <div>
        <p>{t('registrationSuccessMessage')}</p>
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
