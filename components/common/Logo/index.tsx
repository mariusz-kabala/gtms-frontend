import React, { FC } from 'react'
import styles from './styles.scss'

export const Logo: FC<{}> = () => (
  <div className={styles.logo}>
    <img
      src="/static/images/logo_bankpodrozy_rectangle.png"
      alt="Logo"
    />
  </div>
)
