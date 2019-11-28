import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from 'i18n'

export const FourHundredFour: FC<{ additionalStyles?: string }> = ({
  additionalStyles,
}) => {
  const { t } = useTranslation('page404')

  return (
    <div className={cx(styles.page404, additionalStyles)}>
      <div className={styles.overlay} />
      <div className={styles.terminal}>
        <h1>
          <span className={styles.errorCode}>404</span>
        </h1>
        <p className={styles.output}>
          {t('text1')}
        </p>
        <p className={styles.output}>
        {t('text2')}{' '}
          <a className={styles.link} href="#1">
            {t('text3')}
          </a>{' '}
          {t('text4')}{' '}
          <a className={styles.link} href="#2">
            {t('text3')}
          </a>
        </p>
        <p className={styles.output}>
          {t('text5')}
        </p>
      </div>
    </div>
  )
}

FourHundredFour.getInitialProps = async () => ({
  namespacesRequired: ['page404'],
  t: fakeTranslateFunc,
})

export default withTranslation('rules')(RulesPage)
