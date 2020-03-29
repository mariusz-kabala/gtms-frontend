import React, { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import { activateAccount } from '@gtms/api-auth'
import { useRouter } from 'next/router'
import { useTranslation } from '@gtms/commons/i18n'
import { Spinner } from '@gtms/ui/Spinner'
import { initAuthSession } from '@gtms/commons/helpers/auth'
import { redirect } from '@gtms/commons/helpers/redirect'
import { userQuery } from '@gtms/state-user'
import styles from './styles.scss'

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
    <div
      className={styles.wrapper}
      style={{ backgroundImage: `url('/images/temp_images/group_bg.png')` }}
      data-testid="activate-account-page"
    >
      <div className={styles.content}>
        {isLoading && <Spinner />}
        {!isLoading && !hasError && (
          <>
            <h2 data-testid="activate-account-page-confirmation">
              {t('accountActivated')}
            </h2>
            <p>
              Consequat laborum excepteur sit elit elit duis nostrud eu eu
              minim. Reprehenderit exercitation laborum laboris eiusmod irure
              voluptate eiusmod nulla mollit consequat ad. Sit dolor id nostrud
              nisi et sit consequat ullamco laborum veniam magna.
            </p>
          </>
        )}
        {!isLoading && hasError && (
          <>
            <h2 data-testid="activate-account-page-activation-failed">
              {t('activationFailed')}
            </h2>
            <p>
              Consequat laborum excepteur sit elit elit duis nostrud eu eu
              minim. Reprehenderit exercitation laborum laboris eiusmod irure
              voluptate eiusmod nulla mollit consequat ad. Sit dolor id nostrud
              nisi et sit consequat ullamco laborum veniam magna.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

ActivateAccountPage.getInitialProps = async (ctx: NextPageContext) => {
  await initAuthSession(ctx)

  if (userQuery.isLogged()) {
    redirect('/', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['accountActivation'] })
}

export default ActivateAccountPage
