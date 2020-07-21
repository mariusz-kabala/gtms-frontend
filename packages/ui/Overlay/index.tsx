import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Overlay: FC<{
  additionalStyles?: string
  onClick?: () => unknown
}> = ({ additionalStyles, onClick }) => (
  <div
    className={cx(styles.overlay, additionalStyles, {
      [styles.clickable]: onClick,
    })}
    data-testid="overlay"
    onClick={onClick}
  />
)
