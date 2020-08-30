import React, { useEffect, useState } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { ResetPasswordForm } from '../../../components/reset-password/Form'
import { Spinner } from '@gtms/ui/Spinner'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { checkCodeReq } from '@gtms/api-auth'
import { redirect } from '@gtms/commons/helpers/redirect'
import { hasAuthSessionCookies } from '@gtms/state-user'
import { Button } from '@gtms/ui/Button'
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
    <div className={styles.pageWrapper} data-testid="remind-password-page">
      <div className={styles.wrapper}>
        <div>
          <h2 className={styles.header}>
            {/* @todo GEOT-109 - put proper translations everywhere */}
            {t('Podaj nowe haslo do swojego konta')}
          </h2>
          {isLoading && <Spinner />}
          {!isLoading && !isPasswordChanged && (
            <ResetPasswordForm
              code={code}
              onSuccess={() => setIsPasswordChanged(true)}
            />
          )}
          {!isLoading && isPasswordChanged && (
            <div>
              <p data-testid="reset-password-changed-confirmation">
                {t('passwordHasBeenChanged')}
              </p>
              <p>
                <Link href="/login">
                  <Button>{t('goToLogin')}</Button>
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

ResetPasswordPage.getInitialProps = async (ctx: NextPageContext) => {
  if (hasAuthSessionCookies(ctx)) {
    redirect('/', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['resetPassword'] })
}

export default ResetPasswordPage
