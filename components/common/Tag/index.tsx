import React, { FC } from 'react'
import styles from './styles.scss'

export const Tag: FC<{
  label: string
}> = ({ label }) => <div className={styles.tag}>#{label}</div>
