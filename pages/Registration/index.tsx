import { NextPage } from 'next'
import RegistrationForm from './components/Form'
import commonCss from '../styles.scss'
import { withTranslation, IWithTranslations, fakeTranslateFunc } from 'i18n'

const RegistrationPage: NextPage<IWithTranslations> = ({ t }) => {
  return (
    <div className={commonCss.page}>
      <section className={commonCss.header}>
        <p>{t('subtitle')}</p>
        <h1>{t('header')}</h1>
      </section>

      <RegistrationForm />
    </div>
  )
}

RegistrationPage.getInitialProps = async () => ({
  namespacesRequired: ['registration'],
  t: fakeTranslateFunc,
})

export default withTranslation('registration')(RegistrationPage)
