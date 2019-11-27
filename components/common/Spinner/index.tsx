import React, { FC } from 'react'
import styles from './spinner.module.scss'
import cx from 'classnames'

export const Spinner: FC<{
  centered: boolean
}> = ({ centered }) => (
  <div
    className={cx(styles.spinner, {
      [styles.centered]: centered,
    })}
  >
    <div />
  </div>
)
