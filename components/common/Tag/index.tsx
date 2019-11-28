import React, { FC } from 'react'
import styles from './styles.scss'

export const Tag: FC<{
  label: string
}> = ({ label }) => (
  <div data-testid="tag" className={styles.tag}>
    #{label}
  </div>
)
