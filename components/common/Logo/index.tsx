import React, { FC } from 'react'
import styles from './styles.scss'
import LogoImageRectangle from 'assets/images/logo_bankpodrozy_rectangle.png'

export const Logo: FC<{}> = () => (
  <div className={styles.logo}>
    <img src={LogoImageRectangle} alt="Logo Bank Podróży" />
  </div>
)
