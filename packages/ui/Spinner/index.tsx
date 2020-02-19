import React, { FC } from 'react'
import styles from './styles.scss'

export const Spinner: FC<{}> = () => (
  <div data-testid="spinner" className={styles.spinner}>
    <div className={styles.rect1} />
    <div className={styles.rect2} />
    <div className={styles.rect3} />
    <div className={styles.rect4} />
    <div className={styles.rect5} />
  </div>
)
