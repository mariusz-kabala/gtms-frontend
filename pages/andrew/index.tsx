import React from 'react'
import { NextPage } from 'next'
import { withTranslation, IWithTranslations, fakeTranslateFunc } from 'i18n'
import styles from './styles.scss'

export const AndrewLandingPage: NextPage<IWithTranslations> = ({ t }) => {
  return (
    <div className={styles.wrapper}>
      <h1 style={{ display: 'none' }}>{t('header.header')}</h1>
      <section className={`${styles.section} ${styles.intro}`}>
        <h2>Szukamy Andrzeja</h2>
        <p>Tym razem się uda! Dzięki pomocy internetu odnajdziemy go!</p>
        <p>
          Na początek... stworzymy{' '}
          <span>wielką bazę wszystkich wiosek na Woodstocku.</span>
        </p>
        <p>Andrzej gdzieś tam jest... i czeka aż go znajdziemy!</p>
      </section>
      <section className={styles.about}></section>
    </div>
  )
}

AndrewLandingPage.getInitialProps = async () => ({
  namespacesRequired: ['andrew'],
  t: fakeTranslateFunc,
})

export default withTranslation('andrew')(AndrewLandingPage)
