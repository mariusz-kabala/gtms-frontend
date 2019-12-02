import React from 'react'
import { NextPage } from 'next'
import { withTranslation, IWithTranslations, fakeTranslateFunc } from 'i18n'
import styles from './styles.scss'

export const AndrewLandingPage: NextPage<IWithTranslations> = ({ t }) => {
  return (
    <div className={styles.wrapper}>
      <h1 style={{ display: 'none' }}>{t('header.header')}</h1>
      <section className={styles.intro}>
        <h2>Szukamy Andrzeja</h2>
        <p>Tym razem się uda! Dzięki pomocy internetu odnajdziemy Andrzeja!</p>
        <p>Stworzymy bazę wszystkich wiosek na Woodstocku.</p>
      </section>
      <section className={styles.about}>
        <h2>Szukamy Andrzeja</h2>
        <p>Tym razem się uda! Dzięki pomocy internetu odnajdziemy Andrzeja!</p>
        <p>Stworzymy bazę wszystkich wiosek na Woodstocku.</p>
      </section>
    </div>
  )
}

AndrewLandingPage.getInitialProps = async () => ({
  namespacesRequired: ['andrew'],
  t: fakeTranslateFunc,
})

export default withTranslation('andrew')(AndrewLandingPage)
