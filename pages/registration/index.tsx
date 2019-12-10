import React from 'react'
import styles from './styles.scss'
import { Logo } from 'components/common/Logo'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useTranslation } from 'i18n'
import { userQuery } from 'state/user'
import { AnimatedComponent } from 'components/common/AnimatedComponent'
import { RegistrationForm } from 'components/registration/Form'
import { SuccessConfirmation } from 'components/registration/SuccessConfirmation'
import { ImageCover } from 'components/common/ImageCover'

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
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <AnimatedComponent>
          <Logo />
        </AnimatedComponent>
        {!hasUserData && <RegistrationForm />}
        {hasUserData && <SuccessConfirmation />}
      </div>
      <ImageCover />
      <span>
        {/* @todo remove temporary code */}
        {t('subtitle')}
      </span>
    </div>
  )
}

export default RegistrationPage
