import React, { FC } from 'react'
import cx from 'classnames'
import styles from './styles.scss'

export const Spinner: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => (
  <div className={cx(styles.wrapper, additionalStyles)} data-testid="spinner">
    <div className={styles.rect1} />
    <div className={styles.rect2} />
    <div className={styles.rect3} />
    <div className={styles.rect4} />
    <div className={styles.rect5} />
  </div>
)
