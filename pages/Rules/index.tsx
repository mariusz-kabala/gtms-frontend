import { useContext } from 'react'
import { NextPage } from 'next'
import { AcceptRulesButton } from './components/AcceptRulesButton'
import { TranslationsContext, ITranslationsContext } from 'providers/Translations'
import commonCss from '../styles.scss'
import css from './styles.scss'

export const RulesPage: NextPage<{}> = () => {
    const { t } = useContext<ITranslationsContext>(TranslationsContext)

    return (
        <div className={commonCss.page}>
            <header className={commonCss.header}>
                <p>{t('header.subtitle')}</p>
                <h1>{t('header.registration')}</h1>
            </header>

            <article
                className={css.rules}
            >
                <p>
                    Zgodnie z art. 13 ust. 1 i ust. 2 Rozporządzenia Parlamentu Europejskiego I Rady
                    (UE) 2016/679 z dnia 27 kwietnia 2016 r. (dalej RORO) informuję, iż:
                </p>
                <p>
                    1. Administratorem Twoich danych osobowych jest NerdART Mariusz Kabała, ul.
                    Sikorskiego 2/2 41-219 Sosnowiec; tel: 792-550-681
                </p>
                <p>
                    2. Twoje dane osobowe przetwarzane będą na podstawie wyrażonej przez Ciebie
                    zgody (Art. 6 ust 1 pkt. a), w celu umożliwienia Ci wspólnej podróży na festiwal
                </p>
                <p>
                    3. Twoje dane osobowe nie będą przekazywane do państwa trzeciego, ani
                    organizacji międzynarodowej.
                </p>
                <p>4. Twoje dane osobowe będziemy przetwarzać do odwołania zgody</p>
                <p>
                    5. Posiadasz prawo dostępu do treści swoich danych, oraz prawo ich sprostowania,
                    usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo
                    wniesienia sprzeciwu, prawo do cofnięcia zgody w dowolnym momencie bez wpływu na
                    zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej
                    cofnięciem
                </p>
                <p>
                    6. Masz prawo wniesienia skargi do organu nadzorczego (Urzędu Ochrony Danych
                    Osobowych) gdy uznasz, iż przetwarzanie Twoich danych osobowych narusza przepisy
                    ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r
                </p>
                <p>
                    7. Podanie przez Ciebie danych osobowych jest dobrowolne, jednak jest warunkiem
                    skorzystania z naszego portalu, bez ich podania nie będziesz mógł z niego
                    skorzystać
                </p>
                <p>
                    8. Twoje dane nie będą przetwarzane w sposób zautomatyzowany, ani w formie
                    profilowania
                </p>
            </article>
            <div>
                <AcceptRulesButton />
            </div>
        </div>
    )
}

export default RulesPage
