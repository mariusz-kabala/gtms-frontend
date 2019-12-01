import React from 'react'
import { Logo } from 'components/common/Logo'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'i18n'
import { userQuery } from 'state/user'
import { RegistrationForm } from 'components/registration/Form'
import { SuccessConfirmation } from 'components/registration/SuccessConfirmation'
import { ImageCover } from 'components/common/ImageCover'
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
    <>
      <div className={commonCss.page}>
        <div style={{ position: 'relative', zIndex: 1000, background: '#000', padding: '20px' }}> { /* @todo move it to global component */ }
          <p>{t('subtitle')}</p>
          <h1>{t('header')}</h1>
          <Logo />
          {!hasUserData && <RegistrationForm />}
          {hasUserData && <SuccessConfirmation />}
        </div>
      </div>
      <ImageCover />
    </>
  )
}

export default RegistrationPage
