import React, { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { AnimatedComponent } from 'components/common/AnimatedComponent'
import { Logo } from 'components/common/Logo'
import { ResetPasswordForm } from 'components/reset-password/Form'
import { Spinner } from 'components/common/Spinner'
import { useTranslation } from 'i18n'
import { checkCodeReq } from 'api/auth'
import { initAuthSession } from 'helpers/auth'
import { redirect } from 'helpers/redirect'
import { userQuery } from 'state/user'
import styles from './styles.scss'

export const ResetPasswordPage: NextPage<{}> = () => {
  const { t } = useTranslation('resetPassword')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()
  const code: string = router.query.code as string
  const [isPasswordChanged, setIsPasswordChanged] = useState<boolean>(false)

  useEffect(() => {
    checkCodeReq({ code })
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        router.push({
          pathname: '/login',
        })
      })
  }, [code])

  return (
    <div className={styles.wrapper} data-testid="remind-password-page">
      <div>
        {' '}
        {/* this div is needed for css purpouse */}
        <AnimatedComponent>
          <Logo />
        </AnimatedComponent>
        {isLoading && <Spinner />}
        {!isLoading && !isPasswordChanged && (
          <ResetPasswordForm
            code={code}
            onSuccess={() => setIsPasswordChanged(true)}
          />
        )}
        {!isLoading && isPasswordChanged && (
          <p data-testid="reset-password-changed-confirmation">
            {t('passwordHasBeenChanged')}
          </p>
        )}
        <span>
          {/* @todo remove temporary code */}
          {t('subtitle')}
        </span>
      </div>
    </div>
  )
}

ResetPasswordPage.getInitialProps = async (ctx: NextPageContext) => {
  await initAuthSession(ctx)

  if (userQuery.isLogged()) {
    redirect('/', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['resetPassword'] })
}

export default ResetPasswordPage
