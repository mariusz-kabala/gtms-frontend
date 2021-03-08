import React, { FC } from 'react'
// ui
import styles from './styles.scss'

export const WelcomeText: FC = () => {
  return (
    <div className={styles.welcomeTextWrapper} data-testid="welcome-text">
      <div className={styles.content}>
        <h2>Welome to Black Rock City</h2>
        <p>
          {`Once a year, tens of thousands of people gather in Nevada's Black Rock Desert to create Black Rock City, a temporary metropolis dedicated to community, art, self-expression, and self-reliance. In this crucible of creativity, all are welcome.`}
        </p>
      </div>
    </div>
  )
}
