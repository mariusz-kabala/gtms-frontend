import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const Overlay: FC<{
  additionalStyles?: string
  onClick?: () => unknown
  opacity?: number
}> = ({ additionalStyles, onClick, opacity }) => (
  <div
    className={cx(styles.overlay, additionalStyles, {
      [styles.clickable]: onClick,
    })}
    data-testid="overlay"
    onClick={onClick}
    style={{ opacity: opacity ? opacity : 0.75 }}
  />
)
