import React, { FC } from 'react'
import cx from 'classnames'
import styles from './styles.scss'

export const Tag: FC<{
  label: string
  additionalStyles?: string
  onClick?: () => unknown
}> = ({ label, onClick, additionalStyles }) => (
  <div
    onClick={onClick}
    data-testid="tag"
    className={cx(styles.tag, additionalStyles)}
  >
    #{label}
  </div>
)
