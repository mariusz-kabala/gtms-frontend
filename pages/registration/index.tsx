import React from 'react'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'i18n'
import { userQuery } from 'state/user'
import { RegistrationForm } from 'components/registration/Form'
import { SuccessConfirmation } from 'components/registration/SuccessConfirmation'
import commonCss from '../styles.scss'

const RegistrationPage: NextPage<{}> = () => {
  const { t } = useTranslation('registration')
  const [hasUserData, setHasUserData] = useState<boolean>(false)

  useEffect(() => {
    const subscription = userQuery.hasData$.subscribe(hasData =>
      setHasUserData(hasData)
    )

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className={commonCss.page}>
      <section className={commonCss.header}>
        <p>{t('subtitle')}</p>
        <h1>{t('header')}</h1>
      </section>

      {!hasUserData && <RegistrationForm />}
      {hasUserData && <SuccessConfirmation />}
    </div>
  )
}

export default RegistrationPage
