import { NextPage, NextPageContext } from 'next'
import { LoginForm } from './components/Form'
import { useTranslation } from 'i18n'
import { parseCookies, destroyCookie } from 'nookies'
import commonCss from '../styles.scss'
import Router from 'next/router'

const LoginPage: NextPage<{ redirectTo?: string }> = ({ redirectTo }) => {
  const { t, i18n } = useTranslation('login')

  return (
    <div className={commonCss.page}>
      <section className={commonCss.header}>
        <p>{t('subtitle')}</p>
        <h1>{t('title')}</h1>
      </section>

      <section>
        <LoginForm
          onSuccess={() =>
            Router.push({
              pathname: `/${i18n.language}${redirectTo || '/'}`,
            })
          }
        />
      </section>
    </div>
  )
}

LoginPage.getInitialProps = async (ctx: NextPageContext) => {
  let { redirectTo } = parseCookies(ctx)

  destroyCookie(ctx, 'redirectTo')

  return Promise.resolve({ redirectTo })
}

export default LoginPage
