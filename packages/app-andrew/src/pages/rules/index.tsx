import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { AcceptRulesButton } from '../../components/rules/AcceptRulesButton'
import styles from './styles.scss'

export const RulesPage: NextPage<{}> = () => {
  const { t } = useTranslation('rules')
  return (
    <div className={styles.page} data-testid="rules-page">
      <p>{t('header.subtitle')}</p>
      <article className={styles.rules}>
        <p>
          Zgodnie z art. 13 ust. 1 i ust. 2 Rozporządzenia Parlamentu
          Europejskiego I Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (dalej
          RORO) informuję, iż:
        </p>
        <p>
          1. Administratorem Twoich danych osobowych jest <b>MISSING</b>
        </p>
        <p>
          2. Twoje dane osobowe przetwarzane będą na podstawie wyrażonej przez
          Ciebie zgody (Art. 6 ust 1 pkt. a), w celu umożliwienia Ci wspólnej
          podróży na festiwal
        </p>
        <p>
          3. Twoje dane osobowe nie będą przekazywane do państwa trzeciego, ani
          organizacji międzynarodowej.
        </p>
        <p>4. Twoje dane osobowe będziemy przetwarzać do odwołania zgody</p>
        <p>
          5. Posiadasz prawo dostępu do treści swoich danych, oraz prawo ich
          sprostowania, usunięcia, ograniczenia przetwarzania, prawo do
          przenoszenia danych, prawo wniesienia sprzeciwu, prawo do cofnięcia
          zgody w dowolnym momencie bez wpływu na zgodność z prawem
          przetwarzania, którego dokonano na podstawie zgody przed jej
          cofnięciem
        </p>
        <p>
          6. Masz prawo wniesienia skargi do organu nadzorczego (Urzędu Ochrony
          Danych Osobowych) gdy uznasz, iż przetwarzanie Twoich danych osobowych
          narusza przepisy ogólnego rozporządzenia o ochronie danych osobowych z
          dnia 27 kwietnia 2016 r
        </p>
        <p>
          7. Podanie przez Ciebie danych osobowych jest dobrowolne, jednak jest
          warunkiem skorzystania z naszego portalu, bez ich podania nie będziesz
          mógł z niego skorzystać
        </p>
        <p>
          8. Twoje dane nie będą przetwarzane w sposób zautomatyzowany, ani w
          formie profilowania
        </p>
      </article>
      <div>
        <AcceptRulesButton />
      </div>
    </div>
  )
}

RulesPage.getInitialProps = async () =>
  Promise.resolve({ namespacesRequired: ['rules'] })

export default RulesPage
