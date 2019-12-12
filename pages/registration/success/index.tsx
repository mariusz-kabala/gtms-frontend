import React from 'react'
import { Logo } from 'components/common/Logo'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from 'i18n'
import { ImageCover } from 'components/common/ImageCover'
import { Logout } from 'components/common/Logout'
import { userQuery } from 'state/user'
import { initAuthSession } from 'helpers/auth'
import { redirect } from 'helpers/redirect'

export const RegistrationSuccessPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')

  return (
    <>
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
      <ImageCover />
    </>
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
