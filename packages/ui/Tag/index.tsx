import React, { FC } from 'react'
import styles from './styles.scss'

export const Tag: FC<{
  label: string
  onClick?: () => unknown
}> = ({ label, onClick }) => (
  <div onClick={onClick} data-testid="tag" className={styles.tag}>
    #{label}
  </div>
)
