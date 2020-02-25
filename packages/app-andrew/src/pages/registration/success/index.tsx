import React from 'react'
import { Logo } from '@gtms/ui/Logo'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { Logout } from '@gtms/ui/Logout'
import { userQuery } from '@gtms/state-user'
import { initAuthSession } from '@gtms/commons/helpers/auth'
import { redirect } from '@gtms/commons/helpers/redirect'

export const RegistrationSuccessPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')

  return (
    <div data-testid="registration-success-page">
      <div
        style={{
          position: 'relative',
          zIndex: 1000,
          background: '#000',
          padding: '20px',
        }}
      >
        <Logo />
        <div>
          <p>{t('registrationSuccessMessage')}</p>
          <Logout text={t('goToLoginPage')} />
        </div>
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
