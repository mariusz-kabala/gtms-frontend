import { NextPage } from 'next'
import { useEffect } from 'react'
import { LoginForm } from './components/Form'
import { useTranslation } from 'i18n'
import { userQuery } from 'state/user'
import commonCss from '../styles.scss'
import Router from 'next/router'

const LoginPage: NextPage<{}> = () => {
  useEffect(() => {
    const subscription = userQuery.hasSession$.subscribe(
      hasSession =>
        hasSession &&
        Router.push({
          pathname: '/',
        })
    )

    return () => subscription.unsubscribe()
  })
  const { t } = useTranslation('login')

  return (
    <div className={commonCss.page}>
      <section className={commonCss.header}>
        <p>{t('subtitle')}</p>
        <h1>{t('title')}</h1>
      </section>

      <section>
        <LoginForm />
      </section>
    </div>
  )
}

export default LoginPage
