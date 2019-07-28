import { useContext } from 'react'
import { NextPage } from 'next'
import { TranslationsContext } from 'providers/Translations'
import { RegistrationForm } from './components/Form'
import commonCss from '../styles.scss'
import css from './styles.scss'

const RegistrationPage: NextPage<{}> = () => {
    const { t } = useContext(TranslationsContext)

    return (
        <div className={commonCss.page}>
            <section className={css.header}>
                <p>{t('header.subtitle')}</p>
                <h1>{t('header.registration')}</h1>
            </section>

            <section>
                <RegistrationForm />
            </section>
        </div>
    )
}

export default RegistrationPage
