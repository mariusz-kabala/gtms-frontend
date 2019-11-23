import { NextPage } from 'next'
// import { LoginForm } from './components/Form'
import commonCss from '../styles.scss'
import { withTranslation, IWithTranslations, fakeTranslateFunc } from 'i18n'

const LoginPage: NextPage<IWithTranslations> = ({ t }) => {
  return (
    <div className={commonCss.page}>
      <section className={commonCss.header}>
        <p>{t('subtitle')}</p>
        <h1>{t('title')}</h1>
      </section>

      <section>{/* <LoginForm /> */}</section>
    </div>
  )
}

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['login'],
  t: fakeTranslateFunc,
})

export default withTranslation('login')(LoginPage)
