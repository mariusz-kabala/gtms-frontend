import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const FourHundredFour: FC<{ additionalStyles?: string }> = ({
  additionalStyles,
}) => (
  <div className={cx(styles.page404, additionalStyles)}>
    <div className={styles.overlay} />
    <div className={styles.terminal}>
      <h1>
        Error <span className={styles.errorCode}>404</span>
      </h1>
      <p className={styles.output}>
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable
      </p>
      <p className={styles.output}>
        Please try{' '}
        <a className={styles.link} href="#1">
          this link
        </a>{' '}
        or{' '}
        <a className={styles.link} href="#2">
          this link
        </a>
      </p>
      <p className={styles.output}>Good luck</p>
    </div>
  </div>
)
