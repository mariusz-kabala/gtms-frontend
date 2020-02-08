import React, { FC } from 'react'
import styles from './styles.scss'

export const Logo: FC<{}> = () => (
  <div data-testid="logo" className={styles.logo}>
    <img src="/images/temp_images/logo_bankpodrozy_rectangle.png" alt="Logo" />
  </div>
)
