import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { LoginForm } from '../../components/login/Form'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { SocialButtons } from '../../components/login/SocialButtons'
import { userQuery, hasAuthSessionCookies } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
// ui
import { Button } from '@gtms/ui/Button'
import { Picture } from '@gtms/ui/Picture'
import { TagsGrid } from '@gtms/ui/TagsGrid'

export const LoginPage: NextPage<{}> = () => {
  const { t } = useTranslation('login')
  const [error, setError] = useState<string | undefined>()

  useEffect(() => {
    const sub = userQuery.isActive$.subscribe((isActive) => {
      if (userQuery.hasData() && !isActive) {
        redirect('/registration/success')
      }
    })

    const loggedSub = userQuery.isLogged$.subscribe((isLogged) => {
      if (isLogged) {
        redirect('/')
      }
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
      loggedSub && !loggedSub.closed && loggedSub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.pageWrapper} data-testid="login-page">
      <div
        style={{
          backgroundImage: `url('/images/temp_images/login_bg.png')`,
        }}
        className={styles.wrapper}
      >
        <div className={styles.content}>
          <div>
            {error && <div data-testid="login-page-error">{t(error)}</div>}
            <div className={styles.header}>
              <Picture
                additionalStyles={styles.avatar}
                jpg={'/images/avatars/avatar-10.png'}
              />
              <div>
                <h2>Sign in</h2>
                <p>
                  Sunt sint deserunt occaecat reprehenderit est fugiat ex sunt
                  quis nulla deserunt sit culpa.
                </p>
              </div>
            </div>
            <div className={styles.or}>
              <span>or</span>
            </div>
            <SocialButtons
              additionalStyles={styles.socialButtons}
              onFailure={() => setError('socialMediaLoginFailed')}
            />
            <LoginForm additionalStyles={styles.form} />
            <div className={styles.actionButtons}>
              <Link href="/registration">
                <Button additionalStyles={styles.btn}>
                  {t('goToRegistration')}
                </Button>
              </Link>
              <Link href="/remind-password">
                <Button additionalStyles={styles.btn}>
                  {t('goToRemindPassword')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <TagsGrid additionalStyles={styles.tagsGrid} />
    </div>
  )
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  if (hasAuthSessionCookies(ctx)) {
    redirect('/', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['login'] })
}

export default LoginPage
