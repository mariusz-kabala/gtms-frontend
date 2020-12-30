import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { hasAuthSessionCookies } from '@gtms/state-user/src/helpers'
import { redirect } from '@gtms/commons/helpers/redirect'
// ui
import { IoMdCheckmark } from 'react-icons/io'
import { Logout } from '@gtms/ui/Logout'
import styles from './styles.scss'

export const RegistrationSuccessPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')

  return (
    <>
      <div
        className={styles.pageWrapper}
        data-testid="registration-success-page"
      >
        <div className={styles.wrapper}>
          <div className={styles.centerIt}>
            <i>
              <IoMdCheckmark />
            </i>
            <h3>{t('registrationSuccessMessage')}</h3>
            <Logout text={t('goToLoginPage')} />
          </div>
        </div>
      </div>
      <div className={styles.pageBg} />
    </>
  )
}

RegistrationSuccessPage.getInitialProps = async (ctx: NextPageContext) => {
  if (hasAuthSessionCookies(ctx)) {
    redirect('/', ctx)
  }

  // @todo this should remain commented?
  // if (!userQuery.hasData()) {
  //   redirect('/registration', ctx)
  // }

  return Promise.resolve({ namespacesRequired: ['registration'] })
}

export default RegistrationSuccessPage
