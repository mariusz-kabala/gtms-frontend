import { useContext } from 'react'
import { NextPage } from 'next'
import { TranslationsContext } from 'providers/Translations'
import { LoginForm } from './components/Form'
import commonCss from '../styles.scss'

const LoginPage: NextPage<{}> = () => {
    const { t } = useContext(TranslationsContext)

    return (
        <div className={commonCss.page}>
            <section className={commonCss.header}>
                <p>{t('header.subtitle')}</p>
                <h1>{t('header.login')}</h1>
            </section>

            <section>
                <LoginForm />
            </section>
        </div>
    )
}

export default LoginPage
