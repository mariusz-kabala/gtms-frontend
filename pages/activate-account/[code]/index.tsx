import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { activateAccount } from 'api/auth'
import { useRouter } from 'next/router'
import { useTranslation } from 'i18n'
import { Spinner } from 'components/common/Spinner'
import { Logo } from 'components/common/Logo'
import { ImageCover } from 'components/common/ImageCover'

export const ActivateAccountPage: NextPage<{}> = () => {
  const { t } = useTranslation('accountActivation')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)
  const router = useRouter()
  const code: string = router.query.code as string

  useEffect(() => {
    activateAccount(code)
      .then(() => setIsLoading(false))
      .catch(() => {
        setHasError(true)
        setIsLoading(false)
      })
  }, [code])

  return (
    <div data-testid="activate-account-page">
      <section
        style={{
          // @todo remove it soon
          position: 'relative',
          background: 'black',
          padding: '20px',
          zIndex: 1,
        }}
      >
        <Logo />
        {isLoading && <Spinner />}
        {!isLoading && !hasError && (
          <p data-testid="activate-account-page-confirmation">
            {t('accountActivated')}
          </p>
        )}
        {!isLoading && hasError && (
          <p data-testid="activate-account-page-activation-failed">
            {t('activationFailed')}
          </p>
        )}
      </section>
      <ImageCover />
    </div>
  )
}

ActivateAccountPage.getInitialProps = async () => {
  return Promise.resolve({ namespacesRequired: ['accountActivation'] })
}

export default ActivateAccountPage
