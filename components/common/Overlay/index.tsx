import React, { FC } from 'react'
import styles from './styles.scss'

export const Overlay: FC<{ onClick: () => unknown }> = ({ onClick }) => (
  <div onClick={onClick} className={styles.overlay} />
)
