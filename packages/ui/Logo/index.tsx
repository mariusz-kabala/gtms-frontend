import React, { FC } from 'react'
import styles from './styles.scss'
import * as image from './logo_bankpodrozy_rectangle.png'

export const Logo: FC<{}> = () => (
  <div data-testid="logo" className={styles.logo}>
    <img src={image} alt="Logo" />
  </div>
)
