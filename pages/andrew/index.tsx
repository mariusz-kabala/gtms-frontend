import React from 'react'
import { NextPage } from 'next'
import { withTranslation, IWithTranslations, fakeTranslateFunc } from 'i18n'
import styles from './styles.scss'

export const AndrewLandingPage: NextPage<IWithTranslations> = ({ t }) => {
  return (
    <div className={styles.wrapper}>
      <h1>{t('header.header')}</h1>
      andrew
    </div>
  )
}

AndrewLandingPage.getInitialProps = async () => ({
  namespacesRequired: ['andrew'],
  t: fakeTranslateFunc,
})

export default withTranslation('andrew')(AndrewLandingPage)
